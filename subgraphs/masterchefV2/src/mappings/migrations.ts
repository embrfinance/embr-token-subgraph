import {
    Transfer,
  } from '../../generated/EmbrToken/EmbrToken'

import { Address, log} from '@graphprotocol/graph-ts'

import { getEmbrMigrations } from '../entities'


export function transfer(event: Transfer): void {
    const checkAddress = Address.fromString("0x8a50748a79d20f493f4776c07c922e52efd61c95")
    if(event.params.from.toHexString() == checkAddress.toHexString())  {
        log.info('[EmbrToken] Log Migration {} {}', [
            event.params.value.toString(),
            event.params.to.toHexString()
          ])

        const migrations = getEmbrMigrations(event.block)

        migrations.claimed = migrations.claimed.plus(event.params.value)
        migrations.unclaimed = migrations.unclaimed.minus(event.params.value)

        migrations.save()
    }       
}