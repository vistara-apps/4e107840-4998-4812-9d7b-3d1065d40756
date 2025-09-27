import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatAmount(amount: number, decimals: number = 4): string {
  return amount.toFixed(decimals);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function calculateVotePercentage(votes: { for: number; against: number }): {
  forPercentage: number;
  againstPercentage: number;
} {
  const total = votes.for + votes.against;
  if (total === 0) return { forPercentage: 0, againstPercentage: 0 };
  
  return {
    forPercentage: (votes.for / total) * 100,
    againstPercentage: (votes.against / total) * 100,
  };
}

export function getTimeRemaining(endDate: Date): string {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();
  
  if (diff <= 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) return `${days}d ${hours}h remaining`;
  return `${hours}h remaining`;
}

export function generateVideoId(): string {
  return `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function generateProposalId(): string {
  return `prop-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
