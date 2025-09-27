'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../../components/AppShell';
import { DAOProposalCard } from '../../components/DAOProposalCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { InputTextArea } from '../../components/InputTextArea';
import { MOCK_PROPOSALS } from '../../lib/constants';
import { DAOProposal } from '../../lib/types';
import { generateProposalId } from '../../lib/utils';
import { Plus, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export default function DAOPage() {
  const [proposals, setProposals] = useState<DAOProposal[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'finished' | 'create'>('active');
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    targetOrganization: '',
    requestedAmount: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setProposals(MOCK_PROPOSALS);
  }, []);

  const activeProposals = proposals.filter(p => p.status === 'active');
  const finishedProposals = proposals.filter(p => p.status !== 'active');

  const handleVote = async (proposalId: string, voteType: 'for' | 'against') => {
    // Simulate blockchain voting
    console.log(`Voting ${voteType} on proposal ${proposalId}`);
    
    // Update local state (in real app, this would come from blockchain)
    setProposals(prev => prev.map(proposal => {
      if (proposal.proposalId === proposalId) {
        return {
          ...proposal,
          currentVotes: {
            ...proposal.currentVotes,
            [voteType]: proposal.currentVotes[voteType] + 1,
          },
        };
      }
      return proposal;
    }));
  };

  const handleCreateProposal = async () => {
    if (!newProposal.title || !newProposal.description || !newProposal.targetOrganization) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate proposal creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const proposal: DAOProposal = {
        proposalId: generateProposalId(),
        title: newProposal.title,
        description: newProposal.description,
        creatorId: 'current-user',
        creationDate: new Date(),
        votingEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        status: 'active',
        targetOrganization: newProposal.targetOrganization,
        requestedAmount: newProposal.requestedAmount,
        currentVotes: { for: 0, against: 0 },
      };
      
      setProposals(prev => [proposal, ...prev]);
      setNewProposal({ title: '', description: '', targetOrganization: '', requestedAmount: 0 });
      setActiveTab('active');
    } catch (error) {
      console.error('Failed to create proposal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const daoStats = {
    totalProposals: proposals.length,
    activeProposals: activeProposals.length,
    totalVotes: proposals.reduce((sum, p) => sum + p.currentVotes.for + p.currentVotes.against, 0),
    totalFunding: proposals
      .filter(p => p.status === 'passed' || p.status === 'executed')
      .reduce((sum, p) => sum + p.requestedAmount, 0),
  };

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-fg mb-4">CharityVision DAO</h1>
          <p className="text-muted max-w-2xl mx-auto">
            Community-driven governance for charitable impact. Vote on proposals, 
            create initiatives, and direct funding to causes that matter.
          </p>
        </div>

        {/* DAO Stats */}
        <div className="dao-stats mb-12">
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-accent mb-2 flex items-center justify-center gap-2">
              <Users className="w-8 h-8" />
              {daoStats.totalProposals}
            </div>
            <p className="text-muted">Total Proposals</p>
          </div>
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-accent mb-2 flex items-center justify-center gap-2">
              <TrendingUp className="w-8 h-8" />
              {daoStats.totalVotes.toLocaleString()}
            </div>
            <p className="text-muted">Community Votes</p>
          </div>
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-accent mb-2 flex items-center justify-center gap-2">
              <CheckCircle className="w-8 h-8" />
              ${daoStats.totalFunding.toLocaleString()}
            </div>
            <p className="text-muted">Funds Allocated</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-2 flex gap-2">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'active' ? 'bg-accent text-white' : 'text-fg hover:bg-surface'
              }`}
            >
              <Clock className="w-4 h-4" />
              Active ({activeProposals.length})
            </button>
            <button
              onClick={() => setActiveTab('finished')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'finished' ? 'bg-accent text-white' : 'text-fg hover:bg-surface'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Finished ({finishedProposals.length})
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'create' ? 'bg-accent text-white' : 'text-fg hover:bg-surface'
              }`}
            >
              <Plus className="w-4 h-4" />
              Create Proposal
            </button>
          </div>
        </div>

        {/* Active Proposals */}
        {activeTab === 'active' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-fg">Active Proposals</h2>
              <span className="text-muted">{activeProposals.length} proposals need your vote</span>
            </div>
            
            {activeProposals.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeProposals.map((proposal) => (
                  <DAOProposalCard
                    key={proposal.proposalId}
                    proposal={proposal}
                    variant="active"
                    onVote={handleVote}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-fg mb-2">No Active Proposals</h3>
                <p className="text-muted mb-4">Be the first to create a proposal for the community to vote on.</p>
                <PrimaryButton onClick={() => setActiveTab('create')}>
                  <Plus className="w-4 h-4" />
                  Create Proposal
                </PrimaryButton>
              </div>
            )}
          </div>
        )}

        {/* Finished Proposals */}
        {activeTab === 'finished' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-fg">Finished Proposals</h2>
              <span className="text-muted">{finishedProposals.length} completed proposals</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {finishedProposals.map((proposal) => (
                <DAOProposalCard
                  key={proposal.proposalId}
                  proposal={proposal}
                  variant="finished"
                />
              ))}
            </div>
          </div>
        )}

        {/* Create Proposal */}
        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-fg mb-2">Create New Proposal</h2>
              <p className="text-muted">
                Submit a charitable initiative for community voting and funding
              </p>
            </div>
            
            <div className="glass-card p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-fg mb-2">Proposal Title</label>
                  <input
                    type="text"
                    value={newProposal.title}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter a clear, descriptive title..."
                    className="input-field w-full"
                  />
                </div>
                
                <InputTextArea
                  label="Description"
                  value={newProposal.description}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the charitable initiative, its goals, and expected impact..."
                  rows={6}
                  variant="resizable"
                />
                
                <div>
                  <label className="block text-sm font-medium text-fg mb-2">Target Organization</label>
                  <input
                    type="text"
                    value={newProposal.targetOrganization}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, targetOrganization: e.target.value }))}
                    placeholder="Name of the charitable organization..."
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fg mb-2">Requested Amount (USD)</label>
                  <input
                    type="number"
                    value={newProposal.requestedAmount}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, requestedAmount: parseFloat(e.target.value) || 0 }))}
                    placeholder="0"
                    min="0"
                    step="100"
                    className="input-field w-full"
                  />
                </div>
                
                <div className="bg-surface/50 p-4 rounded-lg">
                  <h4 className="font-medium text-fg mb-2">Proposal Guidelines</h4>
                  <ul className="text-sm text-muted space-y-1">
                    <li>• Proposals must be for legitimate charitable causes</li>
                    <li>• Include clear goals and expected outcomes</li>
                    <li>• Voting period lasts 30 days</li>
                    <li>• Requires majority approval to pass</li>
                  </ul>
                </div>
                
                <PrimaryButton
                  onClick={handleCreateProposal}
                  loading={isSubmitting}
                  disabled={!newProposal.title || !newProposal.description || !newProposal.targetOrganization}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? 'Creating Proposal...' : 'Submit Proposal'}
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
