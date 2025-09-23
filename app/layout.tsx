import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import Link from "next/link";
import { socialLinks } from './data/socialLinks'

import { GoogleAnalytics } from '@next/third-parties/google'





// Setting overall metadata for the website
export const metadata = {
  // title: 'Documentation | EsportsDash',
  title: {
    template: '%s - Documentation | EsportsDash',
    default: 'Documentation - EsportsDash',
  },
  keywords: [
    'OBS integration',
    'esports overlay',
    'custom overlay',
    'esports scoreboard',
    'score tracking',
    'broadcast overlay',
    'esports production tool',
    'tournament management',
    'live streaming esports',
    'real-time scorekeeping',
  ],
  description: 'Guides and Documentation for EsportsDash - the professional scoreboard and streaming toolkit for esports broadcasters, tournament organizers, and content creators.',
  metadataBase: new URL('https://docs.esportsdash.com'),
  openGraph: {
    images: [
      {
        url: '/images/general/esportsdash-docs.jpg',
        width: 1200,
        height: 630,
        alt: 'Esports Dash Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/general/esportsdash-docs.jpg'],
  },
}




const banner = <Banner storageKey="esportsdash-docs-construction-notice-1">
  🚧 Documentation is currently under construction. Check back for updates! 🚧
</Banner>

const navbar = (
  <Navbar
    chatLink={socialLinks.discord.href}
    chatIcon={socialLinks.discord.icon}
    // projectLink={socialLinks.github.href}
    // projectIcon={socialLinks.github.icon}
    logo={
      <>
        <img src="/images/general/icon_128.png" alt="Logo" width={40} height={40} />
        <span style={{ marginLeft: '.4em', fontWeight: 800 }}>
          Esports Dash Docs
        </span>
      </>
    }
    logoLink="/"
  >
    <Link
      href={socialLinks.twitter.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {socialLinks.twitter.icon}
    </Link>
    <Link
      href={socialLinks.youtube.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {socialLinks.youtube.icon}
    </Link>
  </Navbar>
)

const footer = (
  <Footer>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      width: '100%',
      padding: '1rem 0'
    }}>
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center'
      }}>
        {Object.values(socialLinks).map(({ name, href, icon }) => (
          <Link
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              padding: '0.5rem 1rem',
              gap: '0.5rem'
            }}
          >
            {icon}
            {name}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <hr style={{
        width: '100%',
        border: 'none',
        borderTop: '1px solid gray',
        margin: '0.5rem 0'
      }} />

      {/* Copyright */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.875rem',
        // color: 'var(--nextra-text-secondary-color)'
      }}>
        © {new Date().getFullYear()} GitProductions. All rights reserved.<br />
        <strong>Esports Dash™</strong> is proprietary software developed by GitProductions.<br />
        Unauthorized reproduction, distribution, or modification is strictly prohibited.
      </div>
    </div>
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >


      <Head
        color={{
          hue: 220,
          saturation: {
            light: 100,
            dark: 80  // Lower saturation for dark mode to avoid brown tint
          },
          lightness: {
            light: 40,
            dark: 60  // Lower lightness value for dark mode
          }
        }}

      >



        <link rel="shortcut icon" href="/images/general/icon.svg" />
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>

      <body>

        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/GitProductions/EsportsDash-Docs/tree/main"
          footer={footer}

          nextThemes={{
            defaultTheme: 'dark'
          }}

          sidebar={{
            defaultMenuCollapseLevel: 1, // Change this number to control the default collapse level
            autoCollapse: true, // If true, automatically collapse inactive folders above defaultMenuCollapseLevel
            toggleButton: true // Hide/show sidebar toggle button. Defaults to `false`
          }}

          feedback={{}}
        >
          {children}

          <GoogleAnalytics gaId="G-DL6W26GHMH" />

        </Layout>
      </body>
    </html>
  )
}