'use client';

import { useState } from 'react';
import { Menu, X, Video, Vote, Heart, Settings2 } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { useTheme } from '../app/components/ThemeProvider';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: 'Create', href: '/create', icon: Video },
    { name: 'DAO', href: '/dao', icon: Vote },
    { name: 'Donate', href: '/donate', icon: Heart },
  ];

  const shellClasses = variant === 'glass' 
    ? 'min-h-screen bg-bg/80 backdrop-blur-lg' 
    : 'min-h-screen bg-bg';

  return (
    <div className={shellClasses}>
      {/* Header */}
      <header className="glass-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gradient">CharityVision</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-fg hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* Wallet Connection & Theme Selector */}
            <div className="flex items-center gap-4">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="input-field text-sm py-2 px-3"
              >
                <option value="default">Default</option>
                <option value="celo">Celo</option>
                <option value="solana">Solana</option>
                <option value="base">Base</option>
                <option value="coinbase">Coinbase</option>
              </select>
              
              <Wallet>
                <ConnectWallet>
                  <div className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg border border-border hover:border-accent transition-colors duration-200">
                    <Avatar className="w-6 h-6" />
                    <Name className="text-sm font-medium" />
                  </div>
                </ConnectWallet>
              </Wallet>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-fg hover:text-accent p-2"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-fg hover:text-accent block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted">
            <p>&copy; 2024 CharityVision. Empowering charitable impact through decentralized video creation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
