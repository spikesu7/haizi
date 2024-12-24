import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stock Tracker',
  description: 'A simple application to track your stock portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script id="github-pages-redirect">
          {`
            (function(){
              let redirect = sessionStorage.redirect;
              delete sessionStorage.redirect;
              if (redirect && redirect !== location.href) {
                history.replaceState(null, null, redirect);
              }
            })();
          `}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen bg-white font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  )
}

