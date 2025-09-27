'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../../components/AppShell';
import { PrimaryButton } from '../../components/PrimaryButton';
import { MOCK_PROPOSALS } from '../../lib/constants';
import { DAOProposal, Donation } from '../../lib/types';
import { formatAmount } from '../../lib/utils';
import { Heart, DollarSign, TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';

export default function DonatePage() {
  const [proposals, setProposals] = useState<DAOProposal[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<DAOProposal | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [isDonating, setIsDonating] = useState(false);
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);

  useEffect(() => {
    // Load active and passed proposals
    const availableProposals = MOCK_PROPOSALS.filter(p => 
      p.status === 'active' || p.status === 'passed'
    );
    setProposals(availableProposals);
    
    // Mock recent donations
    setRecentDonations([
      {
        donationId: 'don-1',
        userId: 'user-1',
        proposalId: 'prop-1',
        amount: 250,
        transactionHash: '0x123...abc',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        recipient: 'Water for Life Foundation',
      },
      {
        donationId: 'don-2',
        userId: 'user-2',
        proposalId: 'prop-2',
        amount: 100,
        transactionHash: '0x456...def',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        recipient: 'Education First Alliance',
      },
    ]);
  }, []);

  const handleDonate = async () => {
    if (!selectedProposal || donationAmount <= 0) return;

    setIsDonating(true);
    
    try {
      // Simulate blockchain donation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newDonation: Donation = {
        donationId: `don-${Date.now()}`,
        userId: 'current-user',
        proposalId: selectedProposal.proposalId,
        amount: donationAmount,
        transactionHash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`,
        timestamp: new Date(),
        recipient: selectedProposal.targetOrganization,
      };
      
      setRecentDonations(prev => [newDonation, ...prev]);
      setDonationAmount(0);
      setSelectedProposal(null);
      
      // Show success message
      alert('Donation successful! Thank you for your contribution.');
    } catch (error) {
      console.error('Donation failed:', error);
      alert('Donation failed. Please try again.');
    } finally {
      setIsDonating(false);
    }
  };

  const totalDonated = recentDonations.reduce((sum, d) => sum + d.amount, 0);
  const quickAmounts = [25, 50, 100, 250, 500];

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-fg mb-4">
            Make a <span className="text-gradient">Direct Impact</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Support community-approved charitable initiatives through transparent, 
            blockchain-powered donations.
          </p>
        </div>

        {/* Donation Stats */}
        <div className="dao-stats mb-12">
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-accent mb-2 flex items-center justify-center gap-2">
              <Heart className="w-8 h-8" />
              ${totalDonated.toLocaleString()}
            </div>
            <p className="text-muted">Your Total Donations</p>
          </div>
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-accent mb-2 flex items-center justify-center gap-2">
              <Users className="w-8 h-8" />
              {proposals.length}
            </div>
            <p className="text-muted">Active Causes</p>
          </div>
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-accent mb-2 flex items-center justify-center gap-2">
              <TrendingUp className="w-8 h-8" />
              {recentDonations.length}
            </div>
            <p className="text-muted">Recent Donations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donation Form */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold text-fg mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-accent" />
              Make a Donation
            </h2>
            
            {/* Select Proposal */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-fg mb-3">
                Choose a Charitable Initiative
              </label>
              <div className="space-y-3">
                {proposals.map((proposal) => (
                  <div
                    key={proposal.proposalId}
                    onClick={() => setSelectedProposal(proposal)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedProposal?.proposalId === proposal.proposalId
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-fg">{proposal.title}</h3>
                        <p className="text-sm text-muted mt-1">{proposal.targetOrganization}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {proposal.status === 'active' ? (
                          <span className="text-blue-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Active
                          </span>
                        ) : (
                          <span className="text-green-400 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Approved
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation Amount */}
            {selectedProposal && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-fg mb-3">
                  Donation Amount (USD)
                </label>
                
                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        donationAmount === amount
                          ? 'bg-accent text-white'
                          : 'bg-surface text-fg hover:bg-accent/20'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                
                {/* Custom Amount Input */}
                <input
                  type="number"
                  value={donationAmount || ''}
                  onChange={(e) => setDonationAmount(parseFloat(e.target.value) || 0)}
                  placeholder="Enter custom amount..."
                  min="1"
                  step="1"
                  className="input-field w-full"
                />
              </div>
            )}

            {/* Selected Proposal Details */}
            {selectedProposal && (
              <div className="mb-6 p-4 bg-surface/50 rounded-lg">
                <h4 className="font-medium text-fg mb-2">Donation Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Recipient:</span>
                    <span className="text-fg">{selectedProposal.targetOrganization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Amount:</span>
                    <span className="text-accent font-medium">${formatAmount(donationAmount, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Transaction Fee:</span>
                    <span className="text-fg">~$2.50</span>
                  </div>
                </div>
              </div>
            )}

            {/* Donate Button */}
            <PrimaryButton
              onClick={handleDonate}
              loading={isDonating}
              disabled={!selectedProposal || donationAmount <= 0}
              className="w-full"
              size="lg"
            >
              {isDonating ? 'Processing Donation...' : (
                <>
                  <Heart className="w-5 h-5" />
                  Donate ${formatAmount(donationAmount, 0)}
                </>
              )}
            </PrimaryButton>
          </div>

          {/* Recent Donations & Impact */}
          <div className="space-y-6">
            {/* Recent Donations */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-fg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Donations
              </h3>
              
              {recentDonations.length > 0 ? (
                <div className="space-y-3">
                  {recentDonations.slice(0, 5).map((donation) => (
                    <div key={donation.donationId} className="donation-tracker">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-fg">{donation.recipient}</p>
                          <p className="text-xs text-muted">
                            {donation.timestamp.toLocaleDateString()} at{' '}
                            {donation.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-accent">${donation.amount}</p>
                          <p className="text-xs text-muted">
                            {donation.transactionHash}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-muted mx-auto mb-3" />
                  <p className="text-muted">No donations yet</p>
                  <p className="text-sm text-muted">Make your first donation to get started!</p>
                </div>
              )}
            </div>

            {/* Impact Metrics */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-fg mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <span className="text-muted">Total Donated</span>
                  <span className="font-bold text-accent">${totalDonated}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <span className="text-muted">Causes Supported</span>
                  <span className="font-bold text-fg">{new Set(recentDonations.map(d => d.proposalId)).size}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <span className="text-muted">Donation Rank</span>
                  <span className="font-bold text-fg">Top 15%</span>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-fg mb-4">How Donations Work</h3>
              <div className="space-y-3 text-sm text-muted">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                  <p>Choose from community-approved charitable initiatives</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                  <p>Your donation is processed securely on the Base blockchain</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                  <p>Funds are transparently transferred to the target organization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
