export const VIDEO_TEMPLATES: VideoTemplate[] = [
  {
    templateId: 'fundraising-hero',
    name: 'Fundraising Hero',
    description: 'Bold template for major fundraising campaigns',
    previewUrl: '/templates/fundraising-hero.jpg',
    mediaSlots: 3,
    textLayerCount: 4,
    category: 'fundraising',
    isPremium: false,
  },
  {
    templateId: 'awareness-story',
    name: 'Awareness Story',
    description: 'Narrative-driven template for cause awareness',
    previewUrl: '/templates/awareness-story.jpg',
    mediaSlots: 5,
    textLayerCount: 6,
    category: 'awareness',
    isPremium: true,
  },
  {
    templateId: 'testimonial-impact',
    name: 'Impact Testimonial',
    description: 'Showcase real stories and impact',
    previewUrl: '/templates/testimonial-impact.jpg',
    mediaSlots: 2,
    textLayerCount: 3,
    category: 'testimonial',
    isPremium: false,
  },
  {
    templateId: 'education-explainer',
    name: 'Education Explainer',
    description: 'Clear, informative template for educational content',
    previewUrl: '/templates/education-explainer.jpg',
    mediaSlots: 4,
    textLayerCount: 5,
    category: 'education',
    isPremium: true,
  },
];

export const MOCK_PROPOSALS: DAOProposal[] = [
  {
    proposalId: 'prop-1',
    title: 'Support Clean Water Initiative in Kenya',
    description: 'Fund the installation of 10 water wells in rural Kenya communities, providing clean water access to over 5,000 people.',
    creatorId: 'user-1',
    creationDate: new Date('2024-01-15'),
    votingEndDate: new Date('2024-02-15'),
    status: 'active',
    targetOrganization: 'Water for Life Foundation',
    requestedAmount: 25000,
    currentVotes: { for: 1247, against: 89 },
  },
  {
    proposalId: 'prop-2',
    title: 'Educational Supplies for Underserved Schools',
    description: 'Provide books, computers, and learning materials to 20 schools in underserved communities.',
    creatorId: 'user-2',
    creationDate: new Date('2024-01-10'),
    votingEndDate: new Date('2024-02-10'),
    status: 'active',
    targetOrganization: 'Education First Alliance',
    requestedAmount: 15000,
    currentVotes: { for: 892, against: 156 },
  },
  {
    proposalId: 'prop-3',
    title: 'Emergency Food Relief Program',
    description: 'Immediate food assistance for families affected by recent natural disasters.',
    creatorId: 'user-3',
    creationDate: new Date('2024-01-05'),
    votingEndDate: new Date('2024-01-25'),
    status: 'passed',
    targetOrganization: 'Global Relief Network',
    requestedAmount: 35000,
    currentVotes: { for: 2156, against: 234 },
  },
];

export const PRICING = {
  VIDEO_GENERATION: {
    BASIC: 0.001, // ETH
    PREMIUM_TEMPLATE: 0.003, // ETH
    EXTENDED_MEDIA: 0.002, // ETH
  },
  DAO_FEES: {
    PROPOSAL_CREATION: 0.01, // ETH
    VOTING_FEE: 0.0005, // ETH
  },
};

export const SUPPORTED_CHAINS = {
  BASE: {
    id: 8453,
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org',
  },
};
