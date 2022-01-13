import { Governance } from '../../generated/schema'
import { dataSource, ethereum } from '@graphprotocol/graph-ts'
import {BIG_INT_ZERO, EMBR_MIGRATION_FUNDING} from 'const'

export function getGovernance(block: ethereum.Block): Governance {
  let governance = Governance.load(dataSource.address().toHex())

  if (governance === null) {
    governance = new Governance(dataSource.address().toHex())
    governance.purposalCount = BIG_INT_ZERO
    governance.quorumVotes = BIG_INT_ZERO
  }

 
  governance.timestamp = block.timestamp
  governance.block = block.number
  governance.save()

  return governance as Governance
}