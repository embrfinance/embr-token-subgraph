import {ADDRESS_ZERO, BIG_DECIMAL_1E18, BIG_DECIMAL_ZERO, BIG_INT_ZERO,} from 'const'
import {BigDecimal, dataSource, log} from '@graphprotocol/graph-ts'
import {
  Bar as BarContract,
  Enter,
  Leave,
   ShareRevenue,
  Transfer as TransferEvent
} from '../../generated/BeetsBar/Bar'
import {getBar, getUser} from "../entities";
import {ERC20} from "../../generated/BeetsBar/ERC20";


export function enter(event: Enter): void {

  const bar = getBar(event.block)
  const user = getUser(event.params.user, event.block)

  const vestingInAmount = event.params.vestingInAmount.divDecimal(BIG_DECIMAL_1E18);
  const mintAmount = event.params.mintedAmount.divDecimal(BIG_DECIMAL_1E18)
  user.vestingTokenIn= user.vestingTokenIn.plus( vestingInAmount);
  user.fBeets = user.fBeets.plus(mintAmount)
  user.save()
  bar.vestingTokenSupply = bar.vestingTokenSupply.plus(vestingInAmount)
  bar.totalSupply = bar.totalSupply.plus(mintAmount)
  bar.fBeetsMinted = bar.fBeetsMinted.plus(mintAmount)
  bar.ratio = bar.vestingTokenSupply.div(bar.totalSupply)
  bar.save()
}

export function leave(event: Leave): void {

  const bar = getBar(event.block)
  const user = getUser(event.params.user, event.block)

  const vestingOutAmount = event.params.vestingOutAmount.divDecimal(BIG_DECIMAL_1E18);
  const burnedAmount = event.params.burnedAmount.divDecimal(BIG_DECIMAL_1E18)
  user.vestingTokenOut = user.vestingTokenOut.plus( vestingOutAmount);
  user.fBeets = user.fBeets.minus(burnedAmount)
  user.save()

  bar.vestingTokenSupply = bar.vestingTokenSupply.minus(vestingOutAmount)
  bar.totalSupply = bar.totalSupply.minus(burnedAmount)
  bar.fBeetsBurned = bar.fBeetsBurned.plus(burnedAmount)
  bar.ratio = bar.vestingTokenSupply.div(bar.totalSupply)
  bar.save()
}


export function shareRevenue(event: ShareRevenue): void {
  const bar = getBar(event.block)

  const sharedRevenueAmount = event.params.amount.divDecimal(BIG_DECIMAL_1E18)
  bar.vestingTokenSupply = bar.vestingTokenSupply.plus(sharedRevenueAmount)
}

export function transfer(event: TransferEvent): void {
  const transferAmount = event.params.value.divDecimal(BIG_DECIMAL_1E18)

  // only handle user to user transfers
  if (transferAmount.equals(BIG_DECIMAL_ZERO) || event.params.from === ADDRESS_ZERO || event.params.to === ADDRESS_ZERO) {
    return
  }

  const bar = getBar(event.block)


  const what = transferAmount.times(bar.ratio)

  // If transfer from address to address and not known fBeets pools.
  if (event.params.from != ADDRESS_ZERO && event.params.to != ADDRESS_ZERO) {
    log.info('transfered {} fBeets from {} to {}', [
      transferAmount.toString(),
      event.params.from.toHex(),
      event.params.to.toHex(),
    ])

    const fromUser = getUser(event.params.from, event.block)


    fromUser.fBeets = fromUser.fBeets.minus(transferAmount)
    fromUser.vestingTokenOut = fromUser.vestingTokenOut.plus(what)

    fromUser.save()

    const toUser = getUser(event.params.to, event.block)


    toUser.fBeets = toUser.fBeets.plus(transferAmount)
    toUser.vestingTokenIn = toUser.vestingTokenIn.plus(what)

    toUser.save()
  }
}
