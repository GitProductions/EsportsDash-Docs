import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import Link from "next/link";
import { socialLinks } from './data/socialLinks'

import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script';





// Setting overall metadata for the website
export const metadata = {
  // title: 'Documentation | EsportsDash',
  title: {
    template: '%s | EsportsDash Docs',
    default: 'Documentation - EsportsDash',
  },
  alternates: {
    canonical: 'https://docs.esportsdash.com',
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
  description: 'EsportsDash tools for broadcasters and organizers with custom overlays, OBS integration, and score tracking.',
  metadataBase: new URL('https://docs.esportsdash.com'),
  openGraph: {
    url: 'https://docs.esportsdash.com',
    images: 
      {
        url: 'https://docs.esportsdash.com/images/general/esportsdash-docs.jpg',
        width: 1200,
        height: 630,
        alt: 'Esports Dash Documentation',
      },
    
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/general/esportsdash-docs.jpg'],
  },


   icons: {
    icon: '/images/general/icon_128.png',
    shortcut: '/images/general/icon_128.png',
    apple: '/images/general/icon_128.png',
    // other: {
    //   rel: 'apple-touch-icon-precomposed',
    //   url: '/images/general/apple-touch-icon-precomposed.png',
    // },
  },
}

const CTAButton = () => {

  return (
    <>
      <Link
        title='Download Latest Version of Esports Dash'
        href="http://esportsdash.com/downloads/fetch?type=app"
        target="_blank"
        aria-label="Download Esports Dash"
      >
        <div style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0066ffff',
          color: 'white',
          borderRadius: '0.375rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'background-color 0.3s',
        }}
        >
          Download
        </div>
      </Link>
    </>
  );
};


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

    {/* <CTAButton /> */}
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
  // jsonLD 

  const jsonLd = {

    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Esports Dash Documentation",
        "url": "https://docs.esportsdash.com",
        "description": "Official documentation for Esports Dash, a free esports scoreboard tool. Guides for setup, overlays, game configurations, and OBS/vMix integration.",
        "publisher": {
          "@type": "Organization",
          "name": "Git Productions",
          "url": "https://esportsdash.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://esportsdash.com/images/general/icon_128.png",
            "width": 128,
            "height": 128
          },
          "sameAs": ["https://twitter.com/esportsdash_", "https://esportsdash.com/discord", "https://www.youtube.com/@esportsdash_"],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "support@esportsdash.com",
            "url": "https://esportsdash.com/discord"
          }
        },
        // "potentialAction": {
        //   "@type": "SearchAction",
        //   "target": "https://docs.esportsdash.com/search?q={search_term_string}",
        //   "query-input": "required name=search_term_string"
        // }
      },
      {
        "@type": "WebPage",
        "name": "Esports Dash Documentation - Getting Started",
        "url": "https://docs.esportsdash.com",
        "description": "Get started with Esports Dash: learn setup, overlays, game configs, and integrations for professional esports broadcasts.",
        "isPartOf": {
          "@type": "WebSite",
          "url": "https://docs.esportsdash.com"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://docs.esportsdash.com/images/introduction/intro-download-overlay.png",
          "width": 1200,
          "height": 630
        },
        "relatedLink": [
          "https://docs.esportsdash.com/install-game-configs",
          "https://docs.esportsdash.com/overlays",
          "https://docs.esportsdash.com/support",
          "https://marketplace.elgato.com/@esportsdash?extension=plugins"
        ]
      },
      {
        "@type": "CreativeWork",
        "name": "Esports Dash Documentation",
        "url": "https://docs.esportsdash.com",
        "about": {
          "@type": "SoftwareApplication",
          "name": "Esports Dash",
          "url": "https://esportsdash.com",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Windows 10/11",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "featureList": [
            "Scoreboard Controls",
            "OBS Integration",
            "vMix Integration",
            "Customizable Overlays",
            "Game Configurations",
            "Hotkey Support",
            "Live Match Management"
          ],
          "softwareVersion": "Beta",
          "downloadUrl": "https://esportsdash.com/downloads"
        },
        "author": {
          "@type": "Organization",
          "name": "Git Productions",
          "url": "https://esportsdash.com"
        },
        "inLanguage": "en-US",
        "keywords": [
          "esports overlay documentation",
          "scoreboard tool guide",
          "OBS integration tutorial",
          "vMix integration guide",
          "esports broadcasting software",
          "tournament management tool",
          "live score tracking",
          "custom esports overlays"
        ]
      }
    ]

  };

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



        {/* <link rel="shortcut icon" href="/images/general/icon_128.png" />
        <link rel="apple-touch-icon" href="/images/general/icon_128.png" /> */}


      </Head>

      <Script
        id="schema-org-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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