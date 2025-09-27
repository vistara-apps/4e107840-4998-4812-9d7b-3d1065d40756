import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CharityVision - Decentralized Video Creation for Impact',
  description: 'Empowering creators and organizations to generate engaging videos for charitable causes using automated tools and a DAO-driven donation system.',
  keywords: ['charity', 'video creation', 'DAO', 'blockchain', 'Base', 'donations'],
  authors: [{ name: 'CharityVision Team' }],
  openGraph: {
    title: 'CharityVision - Decentralized Video Creation for Impact',
    description: 'Create impactful videos for charitable causes with automated tools and community-driven donations.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            <div className="min-h-screen bg-bg">
              {children}
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
