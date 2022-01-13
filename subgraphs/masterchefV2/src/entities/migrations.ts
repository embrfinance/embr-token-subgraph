import { Migrations } from '../../generated/schema'
import { dataSource, ethereum } from '@graphprotocol/graph-ts'
import {BIG_INT_ZERO, EMBR_MIGRATION_FUNDING} from 'const'

export function getEmbrMigrations(block: ethereum.Block): Migrations {
  let embrMigrations = Migrations.load("0x0000000000000000000000000000000000000000")

  if (embrMigrations === null) {
    embrMigrations = new Migrations("0x0000000000000000000000000000000000000000")
    embrMigrations.unclaimed  = EMBR_MIGRATION_FUNDING
    embrMigrations.claimed  = BIG_INT_ZERO 
    //embrMigrations.migrator = "0x8A50748a79D20F493F4776C07C922e52eFD61c95"
  }

  embrMigrations.timestamp = block.timestamp
  embrMigrations.block = block.number
  embrMigrations.save()

  return embrMigrations as Migrations
}