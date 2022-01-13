import { Claimed, XUser } from '../../generated/schema'
import { ethereum, Address } from '@graphprotocol/graph-ts'
import {BIG_INT_ZERO, EMBR_MIGRATION_FUNDING} from 'const'

export function getClaimed(owner: XUser, token: Address, block: ethereum.Block): Claimed {
  let id = token.toHex().concat('-').concat(owner.id)
  let claim = Claimed.load(id)
    
  if (claim === null) {
    claim = new Claimed(id)
    claim.owner = owner.id
    claim.address = token
    claim.total = BIG_INT_ZERO
  }

  claim.timestamp = block.timestamp
  claim.block = block.number
  claim.save()

  return claim as Claimed
}