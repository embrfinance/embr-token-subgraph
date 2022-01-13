import { RewardInfo } from '../../generated/schema'
import { BigInt, Address, ethereum } from '@graphprotocol/graph-ts'
import { BIG_INT_ZERO, BIG_INT_ONE, MINI_CHEF_ADDRESS } from 'const'
import { getXembr } from './xembr'

export function getRewardInfo(address: Address, index: BigInt, block: ethereum.Block): RewardInfo {
  const xembr = getXembr(block)
  
  const uid = address.toHex()
  let rewardInfo = RewardInfo.load(uid)

  if (rewardInfo === null) {
    rewardInfo = new RewardInfo(uid)
    rewardInfo.xembr = xembr.id
    rewardInfo.address = address
    rewardInfo.index = index
    rewardInfo.expiry = BIG_INT_ZERO
    rewardInfo.active = true
    rewardInfo.claimed = BIG_INT_ZERO
    rewardInfo.unclaimed = BIG_INT_ZERO
  }

  rewardInfo.timestamp = block.timestamp
  rewardInfo.block = block.number
  rewardInfo.save()

  return rewardInfo as RewardInfo
}
