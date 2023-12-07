import { SessionProvider } from 'next-auth/react';
import { Html, Head, Main, NextScript } from 'next/document';
import Navbar from './components/Navbar';

export default function Document() {
  return (
    <Html lang="en" data-theme="valentine">
      <Head />
      <body>
        <SessionProvider>
          <Navbar></Navbar>
          <main className="p-2 text-xs">
            <Main />
          </main>
          <NextScript />
        </SessionProvider>
      </body>
    </Html>
  );
}
