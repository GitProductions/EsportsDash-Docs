import {Footer, Layout, Navbar} from 'nextra-theme-docs'
import {Banner, Head} from 'nextra/components'
import {getPageMap} from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import Link from "next/link";

export const metadata = {
    // Define your metadata here
    // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
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

const footer = <Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>

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