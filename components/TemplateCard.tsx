'use client';

import { VideoTemplate } from '../lib/types';
import { Crown, Play } from 'lucide-react';

interface TemplateCardProps {
  template: VideoTemplate;
  variant?: 'default' | 'featured';
  onSelect?: (template: VideoTemplate) => void;
}

export function TemplateCard({ 
  template, 
  variant = 'default',
  onSelect 
}: TemplateCardProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(template);
    }
  };

  const cardClasses = variant === 'featured' 
    ? 'template-card border-accent bg-gradient-to-br from-accent/10 to-accent/5' 
    : 'template-card';

  return (
    <div 
      className={`${cardClasses} group`}
      onClick={handleClick}
    >
      {/* Template Preview */}
      <div className="relative aspect-video bg-surface rounded-lg mb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
        
        {/* Premium Badge */}
        {template.isPremium && (
          <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Premium
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-surface/80 text-fg px-2 py-1 rounded-full text-xs font-medium capitalize">
          {template.category}
        </div>
      </div>

      {/* Template Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-fg group-hover:text-accent transition-colors duration-200">
          {template.name}
        </h3>
        <p className="text-sm text-muted line-clamp-2">
          {template.description}
        </p>
        
        {/* Template Stats */}
        <div className="flex items-center justify-between text-xs text-muted">
          <span>{template.mediaSlots} media slots</span>
          <span>{template.textLayerCount} text layers</span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl pointer-events-none" />
    </div>
  );
}
