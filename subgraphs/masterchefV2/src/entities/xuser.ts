import { XUser } from '../../generated/schema'
import { BigInt, Address, ethereum } from '@graphprotocol/graph-ts'
import { BIG_INT_ZERO, BIG_INT_ONE, MINI_CHEF_ADDRESS } from 'const'
import { getXembr } from './xembr'

export function getXUser(address: Address, block: ethereum.Block): XUser {
  const xembr = getXembr(block)
  const uid = address.toHex()
  let user = XUser.load(uid)

  if (user === null) {
    user = new XUser(uid)
    user.xembr = xembr.id
    user.owner = address
    user.staking = BIG_INT_ZERO
    user.start = BIG_INT_ZERO
    user.expiry = BIG_INT_ZERO
  }

  user.timestamp = block.timestamp
  user.block = block.number
  user.save()

  return user as XUser
}
