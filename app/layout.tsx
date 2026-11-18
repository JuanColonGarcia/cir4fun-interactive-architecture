import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CIR4FUN | Interactive Technology Architecture',
  description: 'Explore the CIR4FUN WP3, WP4 and WP5 technology ecosystem.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
