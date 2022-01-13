import { XEmbr } from '../../generated/schema'
import { dataSource, ethereum } from '@graphprotocol/graph-ts'
import {BIG_INT_ZERO, EMBR_MIGRATION_FUNDING} from 'const'

export function getXembr(block: ethereum.Block): XEmbr {
  let xembr = XEmbr.load(dataSource.address().toHex())

  if (xembr === null) {
    xembr = new XEmbr(dataSource.address().toHex())
    xembr.tokenCount = BIG_INT_ZERO
    xembr.activeTokenCount = BIG_INT_ZERO
    xembr.staking = BIG_INT_ZERO
    xembr.userCount = BIG_INT_ZERO
  }

  xembr.timestamp = block.timestamp
  xembr.block = block.number
  xembr.save()

  return xembr as XEmbr
}