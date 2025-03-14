import {Footer, Layout, Navbar} from 'nextra-theme-docs'
import {Banner, Head} from 'nextra/components'
import {getPageMap} from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import Link from "next/link";
// import { DiscordIcon } from 'nextra/icons'

import { GithubIcon, TwitterIcon, YoutubeIcon} from 'lucide-react'

const DiscordIcon = ({ size = 18, className = '', style = {} }) => (
<svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    fill="currentColor"
    className={`bi bi-discord ${className}`}
    viewBox="0 0 16 16"
    style={style}
    >
    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
  </svg>
)


// export const metadata = {
//     // Define your metadata here
//     // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
// }


export const metadata = {
  title: 'Documentation | EsportsDash',
  description: 'Documentation for Esports Dash Scoreboard Tool',
  metadataBase: 'https://docs.esportsdash.com',
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

const banner = <Banner storageKey="esportsdash-docs-construction-notice-1">🚧 Documentation is currently under construction. Check back for updates! 🚧</Banner>
const navbar = (
  
<Navbar
  logo={
    <>
        <img src="/images/general/icon_128.png" alt="Logo" width={40} height={40}/>
      {/* <svg width="24" height="24" viewBox="0 0 24 24">
      
        <path
          fill="currentColor"
          d="M14.683 14.828a4.055 4.055 0 0 1-1.272.858a4.002 4.002 0 0 1-4.875-1.45l-1.658 1.119a6.063 6.063 0 0 0 1.621 1.62a5.963 5.963 0 0 0 2.148.903a6.035 6.035 0 0 0 3.542-.35a6.048 6.048 0 0 0 1.907-1.284c.272-.271.52-.571.734-.889l-1.658-1.119a4.147 4.147 0 0 1-.489.592z M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2zm0 2c2.953 0 5.531 1.613 6.918 4H5.082C6.469 5.613 9.047 4 12 4zm0 16c-4.411 0-8-3.589-8-8c0-.691.098-1.359.264-2H5v1a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1h.736c.166.641.264 1.309.264 2c0 4.411-3.589 8-8 8z"
        />
      </svg> */}
      <span style={{ marginLeft: '.4em', fontWeight: 800 }}>
        Esports Dash Docs
      </span>
    </>
  }
/>
)


const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/GitProductions/EsportsDash-Docs',
    icon: <GithubIcon size={18} />
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/intent/user?screen_name=esportsdash_',
    icon: <TwitterIcon size={18} />
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@Esports-Dash',
    icon: <YoutubeIcon size={18} />
  },
  {
    name: 'Discord',
    href: 'https://esportsdash.com/discord',
    icon: <DiscordIcon />
  }
]

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
      {/* Social Links */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center'
      }}>
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--nextra-border-color)',
              color: 'var(--nextra-text-color)',
              textDecoration: 'none',
              transition: 'all 0.2s',
              gap: '0.5rem'
            }}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <hr style={{ 
        width: '100%',
        border: 'none',
        borderTop: '1px solid var(--nextra-border-color)',
        margin: '0.5rem 0'
      }} />

      {/* Copyright */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.875rem',
        color: 'var(--nextra-text-secondary-color)'
      }}>
        © {new Date().getFullYear()} GitProductions. All rights reserved.<br />
        <strong>Esports Dash™</strong> is proprietary software developed by GitProductions.<br />
        Unauthorized reproduction, distribution, or modification is strictly prohibited.
      </div>
    </div>
  </Footer>
)

export default async function RootLayout({children}) {
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
    


            <link rel="shortcut icon" href="/images/general/icon.svg"/>
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
        >
            {children}
        </Layout>
        </body>
        </html>
    )
}