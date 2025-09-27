'use client';

import { AppShell } from '../../components/AppShell';
import { PrimaryButton } from '../../components/PrimaryButton';
import { VideoPlayer } from '../../components/VideoPlayer';
import { TemplateCard } from '../../components/TemplateCard';
import { DAOProposalCard } from '../../components/DAOProposalCard';
import { VIDEO_TEMPLATES, MOCK_PROPOSALS } from '../../lib/constants';
import { Palette, Eye, Code } from 'lucide-react';

export default function ThemePreviewPage() {
  const sampleTemplate = VIDEO_TEMPLATES[0];
  const sampleProposal = MOCK_PROPOSALS[0];

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-fg mb-4 flex items-center justify-center gap-3">
            <Palette className="w-10 h-10 text-accent" />
            Theme Preview
          </h1>
          <p className="text-xl text-muted">
            Preview all available themes and design components
          </p>
        </div>

        {/* Theme Selector Info */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-semibold text-fg mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6" />
            Current Theme
          </h2>
          <p className="text-muted mb-4">
            Use the theme selector in the header to switch between different blockchain themes.
            Each theme provides a unique visual experience tailored to different blockchain ecosystems.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-surface rounded-lg text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-fg">Default</p>
              <p className="text-xs text-muted">Warm Social</p>
            </div>
            <div className="p-4 bg-surface rounded-lg text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-fg">Celo</p>
              <p className="text-xs text-muted">Black & Yellow</p>
            </div>
            <div className="p-4 bg-surface rounded-lg text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-fg">Solana</p>
              <p className="text-xs text-muted">Purple Gradient</p>
            </div>
            <div className="p-4 bg-surface rounded-lg text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-fg">Base</p>
              <p className="text-xs text-muted">Base Blue</p>
            </div>
            <div className="p-4 bg-surface rounded-lg text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-fg">Coinbase</p>
              <p className="text-xs text-muted">Navy Blue</p>
            </div>
          </div>
        </div>

        {/* Component Previews */}
        <div className="space-y-12">
          {/* Buttons */}
          <section>
            <h2 className="text-2xl font-semibold text-fg mb-6">Button Components</h2>
            <div className="glass-card p-6">
              <div className="flex flex-wrap gap-4">
                <PrimaryButton>Primary Button</PrimaryButton>
                <PrimaryButton variant="outline">Outline Button</PrimaryButton>
                <PrimaryButton variant="destructive">Destructive Button</PrimaryButton>
                <PrimaryButton size="sm">Small Button</PrimaryButton>
                <PrimaryButton size="lg">Large Button</PrimaryButton>
                <PrimaryButton loading>Loading Button</PrimaryButton>
                <PrimaryButton disabled>Disabled Button</PrimaryButton>
              </div>
            </div>
          </section>

          {/* Cards */}
          <section>
            <h2 className="text-2xl font-semibold text-fg mb-6">Card Components</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-fg mb-4">Template Card</h3>
                <TemplateCard template={sampleTemplate} variant="featured" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-fg mb-4">DAO Proposal Card</h3>
                <DAOProposalCard proposal={sampleProposal} variant="active" />
              </div>
            </div>
          </section>

          {/* Video Player */}
          <section>
            <h2 className="text-2xl font-semibold text-fg mb-6">Video Player</h2>
            <div className="glass-card p-6">
              <div className="max-w-2xl">
                <VideoPlayer
                  src="/demo-video.mp4"
                  poster="/demo-poster.jpg"
                  title="Sample Video"
                />
              </div>
            </div>
          </section>

          {/* Form Elements */}
          <section>
            <h2 className="text-2xl font-semibold text-fg mb-6">Form Elements</h2>
            <div className="glass-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-fg mb-2">Text Input</label>
                  <input
                    type="text"
                    placeholder="Enter text..."
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-fg mb-2">Select Dropdown</label>
                  <select className="input-field w-full">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-fg mb-2">Textarea</label>
                  <textarea
                    placeholder="Enter description..."
                    rows={4}
                    className="input-field w-full resize-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Color Palette */}
          <section>
            <h2 className="text-2xl font-semibold text-fg mb-6 flex items-center gap-2">
              <Code className="w-6 h-6" />
              Color Palette
            </h2>
            <div className="glass-card p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-bg rounded-lg mx-auto mb-2 border border-border"></div>
                  <p className="text-sm font-medium text-fg">Background</p>
                  <p className="text-xs text-muted">--color-bg</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-fg rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-fg">Foreground</p>
                  <p className="text-xs text-muted">--color-fg</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-fg">Accent</p>
                  <p className="text-xs text-muted">--color-accent</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-surface rounded-lg mx-auto mb-2 border border-border"></div>
                  <p className="text-sm font-medium text-fg">Surface</p>
                  <p className="text-xs text-muted">--color-surface</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-border rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-fg">Border</p>
                  <p className="text-xs text-muted">--color-border</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-fg">Muted</p>
                  <p className="text-xs text-muted">--color-muted</p>
                </div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section>
            <h2 className="text-2xl font-semibold text-fg mb-6">Typography</h2>
            <div className="glass-card p-6 space-y-4">
              <div>
                <h1 className="text-5xl font-bold text-fg">Display Heading</h1>
                <p className="text-sm text-muted">text-5xl font-bold</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-fg">Section Heading</h2>
                <p className="text-sm text-muted">text-2xl font-semibold</p>
              </div>
              <div>
                <p className="text-base leading-7 text-fg">
                  Body text with proper line height for readability. This demonstrates 
                  the default text styling used throughout the application.
                </p>
                <p className="text-sm text-muted">text-base leading-7</p>
              </div>
              <div>
                <p className="text-sm text-muted">Caption text for additional information</p>
                <p className="text-xs text-muted">text-sm text-muted</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
