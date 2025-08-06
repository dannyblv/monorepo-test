import type { Metadata } from 'next';
import StyledComponentsRegistry from './StyledComponentsRegistry';

export const metadata: Metadata = {
  title: 'Website 1 - Next.js App Router',
  description: 'Next.js application demonstrating shared styled-components from the monorepo common package',
  keywords: ['Next.js', 'React', 'styled-components', 'monorepo', 'TypeScript'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
