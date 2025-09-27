'use client';

import { DAOProposal } from '../lib/types';
import { Clock, Users, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { calculateVotePercentage, getTimeRemaining, formatAmount } from '../lib/utils';

interface DAOProposalCardProps {
  proposal: DAOProposal;
  variant?: 'active' | 'finished';
  onVote?: (proposalId: string, voteType: 'for' | 'against') => void;
}

export function DAOProposalCard({ 
  proposal, 
  variant = 'active',
  onVote 
}: DAOProposalCardProps) {
  const { forPercentage, againstPercentage } = calculateVotePercentage(proposal.currentVotes);
  const timeRemaining = getTimeRemaining(proposal.votingEndDate);
  const totalVotes = proposal.currentVotes.for + proposal.currentVotes.against;

  const handleVote = (voteType: 'for' | 'against') => {
    if (onVote && proposal.status === 'active') {
      onVote(proposal.proposalId, voteType);
    }
  };

  const statusColor = {
    active: 'text-blue-400',
    passed: 'text-green-400',
    rejected: 'text-red-400',
    executed: 'text-purple-400',
  }[proposal.status];

  const statusIcon = {
    active: Clock,
    passed: CheckCircle,
    rejected: XCircle,
    executed: CheckCircle,
  }[proposal.status];

  const StatusIcon = statusIcon;

  return (
    <div className="proposal-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-fg mb-2">{proposal.title}</h3>
          <p className="text-muted text-sm line-clamp-3">{proposal.description}</p>
        </div>
        <div className={`flex items-center gap-1 text-sm ${statusColor} ml-4`}>
          <StatusIcon className="w-4 h-4" />
          <span className="capitalize">{proposal.status}</span>
        </div>
      </div>

      {/* Organization & Amount */}
      <div className="flex items-center justify-between mb-4 p-3 bg-surface/50 rounded-lg">
        <div>
          <p className="text-xs text-muted">Target Organization</p>
          <p className="font-medium text-fg">{proposal.targetOrganization}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted">Requested Amount</p>
          <p className="font-bold text-accent flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            {formatAmount(proposal.requestedAmount, 0)}
          </p>
        </div>
      </div>

      {/* Voting Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted flex items-center gap-1">
            <Users className="w-4 h-4" />
            {totalVotes} votes
          </span>
          {proposal.status === 'active' && (
            <span className="text-sm text-muted flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {timeRemaining}
            </span>
          )}
        </div>

        {/* Vote Progress Bar */}
        <div className="w-full bg-surface rounded-full h-2 mb-2">
          <div className="flex h-full rounded-full overflow-hidden">
            <div 
              className="bg-green-500 transition-all duration-300"
              style={{ width: `${forPercentage}%` }}
            />
            <div 
              className="bg-red-500 transition-all duration-300"
              style={{ width: `${againstPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between text-xs text-muted">
          <span>For: {proposal.currentVotes.for} ({forPercentage.toFixed(1)}%)</span>
          <span>Against: {proposal.currentVotes.against} ({againstPercentage.toFixed(1)}%)</span>
        </div>
      </div>

      {/* Voting Buttons */}
      {proposal.status === 'active' && variant === 'active' && (
        <div className="flex gap-3">
          <button
            onClick={() => handleVote('for')}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Vote For
          </button>
          <button
            onClick={() => handleVote('against')}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Vote Against
          </button>
        </div>
      )}

      {/* Finished Status */}
      {variant === 'finished' && (
        <div className="text-center py-2">
          <span className={`text-sm font-medium ${statusColor}`}>
            Voting {proposal.status === 'passed' ? 'Passed' : 'Ended'}
          </span>
        </div>
      )}
    </div>
  );
}
