'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { VideoPlayer } from '../components/VideoPlayer';
import { TemplateCard } from '../components/TemplateCard';
import { DAOProposalCard } from '../components/DAOProposalCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { VIDEO_TEMPLATES, MOCK_PROPOSALS } from '../lib/constants';
import { VideoTemplate, DAOProposal } from '../lib/types';
import { Play, Users, DollarSign, TrendingUp, Heart, Video, Vote } from 'lucide-react';

export default function HomePage() {
  const [featuredTemplates, setFeaturedTemplates] = useState<VideoTemplate[]>([]);
  const [activeProposals, setActiveProposals] = useState<DAOProposal[]>([]);
  const [stats, setStats] = useState({
    totalVideos: 1247,
    totalDonations: 89500,
    activeProposals: 12,
    communityMembers: 3456,
  });

  useEffect(() => {
    // Load featured templates
    setFeaturedTemplates(VIDEO_TEMPLATES.slice(0, 3));
    
    // Load active proposals
    setActiveProposals(MOCK_PROPOSALS.filter(p => p.status === 'active').slice(0, 2));
  }, []);

  const handleTemplateSelect = (template: VideoTemplate) => {
    // Navigate to create page with selected template
    window.location.href = `/create?template=${template.templateId}`;
  };

  const handleVote = (proposalId: string, voteType: 'for' | 'against') => {
    // Handle voting logic
    console.log(`Voting ${voteType} on proposal ${proposalId}`);
    // In a real app, this would trigger a blockchain transaction
  };

  return (
    <AppShell variant="glass">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-fg mb-6">
            Decentralized Video Creation for{' '}
            <span className="text-gradient">Impact-Driven Causes</span>
          </h1>
          <p className="text-xl text-muted mb-8 leading-relaxed">
            Empower creators and organizations to generate engaging videos for charitable causes 
            using automated tools and a DAO-driven donation system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton size="lg" onClick={() => window.location.href = '/create'}>
              <Video className="w-5 h-5" />
              Start Creating
            </PrimaryButton>
            <PrimaryButton variant="outline" size="lg" onClick={() => window.location.href = '/dao'}>
              <Vote className="w-5 h-5" />
              Join DAO
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="dao-stats">
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-accent mb-2 flex items-center justify-center gap-2">
              <Video className="w-8 h-8" />
              {stats.totalVideos.toLocaleString()}
            </div>
            <p className="text-muted">Videos Created</p>
          </div>
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-accent mb-2 flex items-center justify-center gap-2">
              <DollarSign className="w-8 h-8" />
              ${stats.totalDonations.toLocaleString()}
            </div>
            <p className="text-muted">Total Donations</p>
          </div>
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-accent mb-2 flex items-center justify-center gap-2">
              <Users className="w-8 h-8" />
              {stats.communityMembers.toLocaleString()}
            </div>
            <p className="text-muted">Community Members</p>
          </div>
        </div>
      </section>

      {/* Featured Demo Video */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-fg mb-4">See CharityVision in Action</h2>
          <p className="text-muted">Watch how easy it is to create impactful videos for your cause</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <VideoPlayer
            src="/demo-video.mp4"
            poster="/demo-poster.jpg"
            title="CharityVision Demo"
            className="w-full"
          />
        </div>
      </section>

      {/* Featured Templates */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-fg mb-2">Featured Templates</h2>
            <p className="text-muted">Professional templates to kickstart your campaign</p>
          </div>
          <PrimaryButton variant="outline" onClick={() => window.location.href = '/create'}>
            View All Templates
          </PrimaryButton>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTemplates.map((template) => (
            <TemplateCard
              key={template.templateId}
              template={template}
              variant="featured"
              onSelect={handleTemplateSelect}
            />
          ))}
        </div>
      </section>

      {/* Active DAO Proposals */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-fg mb-2">Active DAO Proposals</h2>
            <p className="text-muted">Community-driven charitable initiatives</p>
          </div>
          <PrimaryButton variant="outline" onClick={() => window.location.href = '/dao'}>
            View All Proposals
          </PrimaryButton>
        </div>
        
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
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-fg mb-4">How CharityVision Works</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Three simple steps to create impactful videos and drive charitable donations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-fg mb-2">1. Create Videos</h3>
            <p className="text-muted">
              Choose from professional templates and customize with your content, 
              brand assets, and messaging.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Vote className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-fg mb-2">2. DAO Governance</h3>
            <p className="text-muted">
              Community members vote on charitable proposals and decide 
              where donations should be directed.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-fg mb-2">3. Make Impact</h3>
            <p className="text-muted">
              Transparent, on-chain donations ensure your contributions 
              reach the intended charitable organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <div className="glass-card p-12 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-fg mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-muted mb-8">
            Join thousands of creators and donors using CharityVision to drive positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton size="lg" onClick={() => window.location.href = '/create'}>
              <Video className="w-5 h-5" />
              Create Your First Video
            </PrimaryButton>
            <PrimaryButton variant="outline" size="lg" onClick={() => window.location.href = '/donate'}>
              <Heart className="w-5 h-5" />
              Start Donating
            </PrimaryButton>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
