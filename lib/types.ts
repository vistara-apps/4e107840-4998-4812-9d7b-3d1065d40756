export interface User {
  userId: string;
  walletAddress: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoTemplate {
  templateId: string;
  name: string;
  description: string;
  previewUrl: string;
  mediaSlots: number;
  textLayerCount: number;
  category: 'fundraising' | 'awareness' | 'education' | 'testimonial';
  isPremium: boolean;
}

export interface Video {
  videoId: string;
  userId: string;
  templateId: string;
  contentData: {
    title: string;
    description: string;
    textLayers: string[];
    mediaUrls: string[];
    brandAssets?: {
      logo?: string;
      colors?: string[];
    };
  };
  renderStatus: 'pending' | 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  createdAt: Date;
}

export interface DAOProposal {
  proposalId: string;
  title: string;
  description: string;
  creatorId: string;
  creationDate: Date;
  votingEndDate: Date;
  status: 'active' | 'passed' | 'rejected' | 'executed';
  targetOrganization: string;
  requestedAmount: number;
  currentVotes: {
    for: number;
    against: number;
  };
}

export interface DAOVote {
  voteId: string;
  userId: string;
  proposalId: string;
  voteType: 'for' | 'against';
  voteDate: Date;
  transactionHash: string;
}

export interface Donation {
  donationId: string;
  userId: string;
  proposalId?: string;
  amount: number;
  transactionHash: string;
  timestamp: Date;
  recipient: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'audio';
  category: 'stock' | 'user-uploaded';
  tags: string[];
}
