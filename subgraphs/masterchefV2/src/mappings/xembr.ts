import { BigInt, BigDecimal, Address, log } from '@graphprotocol/graph-ts';
import {
    RewardsAdded,
    LogTokenAddition,
    LogTokenUpdate,
    RewardPaid,
    Staked,
    Withdraw
  } from '../../generated/xEmbr/xEmbr'
  import { RewardInfo, Lock, Claimed } from '../../generated/schema'
  import { BIG_INT_ZERO } from 'const'
  import { getRewardInfo, getXUser, getClaimed, getXembr } from '../entities'

export function rewardsAdded(event: RewardsAdded): void {
    let addresses: Address[] = event.params.rewardTokens
    let rewards: BigInt[] = event.params.reward
    for (let i=0; i < rewards.length; i ++) {
        log.info('[xEmbr] Reward Addition {} {}', [
            rewards[i].toString(),
            addresses[i].toHex()
        ])

        const rewardInfo = getRewardInfo(addresses[i], new BigInt(i), event.block)
        rewardInfo.unclaimed =  rewardInfo.unclaimed.plus(rewards[i])
        rewardInfo.save()
    }
}

export function rewardPaid(event: RewardPaid): void {
    log.info('[xEmbr] Reward Paid {} {} {}', [
        event.params.user.toHex(),
        event.params.rewardToken.toHex(),
        event.params.reward.toString()
    ])

    const user  = getXUser(event.params.user, event.block)
    const rewardInfo = getRewardInfo(event.params.rewardToken, new BigInt(0), event.block)
    const userClaimed = getClaimed(user, event.params.rewardToken, event.block)

    userClaimed.total = userClaimed.total.plus(event.params.reward)
    userClaimed.save()

    rewardInfo.claimed = rewardInfo.claimed.plus(event.params.reward)
    rewardInfo.unclaimed = rewardInfo.claimed.minus(event.params.reward)
    rewardInfo.save()
}

export function logTokenAddition(event: LogTokenAddition): void {
    log.info('[xEmbr] Log new token {} {}', [
        event.params.rtid.toString(),
        event.params.rewardToken.toHex()
    ])

    let rewardInfo = RewardInfo.load(event.params.rewardToken.toHex())
    if (rewardInfo == null) {
        rewardInfo = new RewardInfo(event.params.rewardToken.toHex())
        rewardInfo.index = event.params.rtid
        rewardInfo.address = event.params.rewardToken
        rewardInfo.expiry = BIG_INT_ZERO
        rewardInfo.active = true
        rewardInfo.claimed = BIG_INT_ZERO
        rewardInfo.unclaimed = BIG_INT_ZERO

        const xembr = getXembr(event.block)
        xembr.tokenCount = xembr.tokenCount.plus(new BigInt(1))
        xembr.save()
    }

    rewardInfo.timestamp = event.block.timestamp
    rewardInfo.block = event.block.number
    rewardInfo.save()
}

export function logTokenUpdate(event: LogTokenUpdate): void {
    log.info('[xEmbr] Log token update {} {} {} {}', [
        event.params.lastAddress.toHex(),
        event.params.expiry.toString(),
        event.params.newAddress.toHex(),
        event.params.newIndex.toString()
    ])

    let rewardInfo = RewardInfo.load(event.params.lastAddress.toHex())
    if (rewardInfo != null) {

        rewardInfo.active = false
        rewardInfo.expiry = event.params.expiry

        let lastRewardInfo = RewardInfo.load(event.params.newAddress.toHex()) 
        if (lastRewardInfo == null) {
            lastRewardInfo = new RewardInfo(event.params.newAddress.toHex())
            lastRewardInfo.index = event.params.newIndex
            lastRewardInfo.address = event.params.newAddress
            lastRewardInfo.expiry = BIG_INT_ZERO
            lastRewardInfo.active = true
            lastRewardInfo.claimed = BIG_INT_ZERO
            lastRewardInfo.unclaimed = BIG_INT_ZERO
        } else { 
            lastRewardInfo.expiry = BIG_INT_ZERO
            lastRewardInfo.active = true
        }

        lastRewardInfo.save()
        rewardInfo.save()
    }
}


export function staked(event: Staked): void {
    log.info('[xEmbr] Log token update {} {} {} {} {}', [
        event.params.provider.toHex(),
        event.params.value.toString(),
        event.params.locktime.toString(),
        event.params.ts.toString()
    ])

    const xembr = getXembr(event.block)
    const user  = getXUser(event.params.provider, event.block)
    const newLock = new Lock(event.block.timestamp.toString())

    user.staking = user.staking.plus(event.params.value)
    if (user.start.notEqual(new BigInt(0))) { 
        user.start = event.params.ts
        xembr.userCount = xembr.userCount.plus(new BigInt(1))
    }
    user.expiry = event.params.locktime
    user.save()

    xembr.staking = xembr.staking.plus(event.params.value) 
    xembr.save()

    newLock.owner = user.id
    newLock.amount = event.params.value
    newLock.action = event.params.action
    newLock.locktime =  event.params.ts
    
    newLock.timestamp = event.block.timestamp
    newLock.block = event.block.number
    newLock.save()
}

export function withdraw(event: Withdraw): void {
    log.info('[xEmbr] Log token update {} {} {}', [
        event.params.provider.toHex(),
        event.params.value.toString(),
        event.params.ts.toString()
    ])

    const xembr = getXembr(event.block)
    const user  = getXUser(event.params.provider, event.block)

    xembr.staking = xembr.staking.minus(event.params.value)
    xembr.userCount = xembr.userCount.minus(new BigInt(1))
    xembr.save()

    user.staking = user.staking.minus(event.params.value)
    user.start = BIG_INT_ZERO
    user.save()
}