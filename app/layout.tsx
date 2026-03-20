import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'THE PRIMORDIAL PROTOCOL',
  description: 'Decode the architecture of reality',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
