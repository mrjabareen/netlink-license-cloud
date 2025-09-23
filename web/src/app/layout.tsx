import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import { LocaleProvider } from '@/components/providers/locale-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NetLink License Cloud',
  description: 'Complete Licensing and Sales Management Platform',
  keywords: 'licensing, software licenses, activation, subscription management',
  authors: [{ name: 'NetLink Technology Solutions' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'NetLink License Cloud',
    description: 'Complete Licensing and Sales Management Platform',
    type: 'website',
    locale: 'en_US',
    siteName: 'NetLink License Cloud',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NetLink License Cloud',
    description: 'Complete Licensing and Sales Management Platform',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LocaleProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              {children}
              <Toaster />
              <SonnerToaster position="top-center" />
            </QueryProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
