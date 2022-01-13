import { BigInt, BigDecimal, Address, log } from '@graphprotocol/graph-ts';
import {
    ProposalCreated,
    ProposalExecuted,
    MinimumVotingPeriodChanged,
    Governance
  } from '../../generated/Governance/Governance'
import { BIG_INT_ZERO } from 'const'
import { getGovernance, getXUser } from '../entities'
import { Purposal } from '../../generated/schema'



export function proposalCreated(event: ProposalCreated): void {
  log.info('[Governance] Proposal Created {} {} {}', [
      event.params.proposalId.toString(),
      event.params.proposer.toHex(),
      event.params.title.toString()
  ])

  const governance = getGovernance(event.block)


  let gov = Governance.bind(Address.fromString(governance.id))
  let callResult = gov.proposals(event.params.proposalId)
  if (!callResult) {
    log.info("governance reverted", [])
    return
  } 

  const title = callResult.value0
  const metadata = callResult.value1
  const proposer = callResult.value2
  const executor = callResult.value3
  const startTime = callResult.value4
  const votingPeriod = callResult.value5
  //const quorumVotes = callResult.value6
  //const executionDelay = callResult.value7
  const forVotes = callResult.value8
  const againstVotes = callResult.value9

  const user  = getXUser(proposer, event.block)
  
  const purposal = new Purposal(event.params.proposalId.toString())
  purposal.index = event.params.proposalId
  purposal.title = title
  purposal.proposer = user.id
  purposal.governance = governance.id
  purposal.metadata = metadata
  purposal.duration = votingPeriod
  purposal.executor = executor
  purposal.startDate = startTime
  purposal.endDate = startTime.plus(votingPeriod)
  purposal.forVotes = forVotes
  purposal.againstVotes = againstVotes
  purposal.executed = false

  purposal.timestamp = event.block.timestamp
  purposal.block = event.block.number
  purposal.save()

  governance.purposalCount = governance.purposalCount.plus(new BigInt(1))
  governance.save()
}

export function proposalExecuted(event: ProposalExecuted): void {


}

export function minimumVoteChange(event: MinimumVotingPeriodChanged): void {


}