import { title } from "process";

export default {
    index: {
        title: '🚀 Getting Started',
    //   title: '✨ Fruits',
    //   items: {
    //     apple: '🍎 Apple',
    //     banana: '🍌 BaNaNa'
    //   }
    },

    // API Documentation
    api: {
      title: 'API',
      items: {
        'api-introduction': {
          title: 'Docs - API Introduction | EsportsDash',
          description: 'Documentation for Esports Dash REST API endpoints',
          openGraph: {
            images: [
              {
                url: '/images/general/icon_128.png',
                width: 1200,
                height: 630,
                alt: 'Esports Dash API Introduction',
              },
            ],
          },
          twitter: {
            card: 'summary_medium_image',
            images: ['/images/general/icon_128.png'],
          },
        },

        'api-endpoints': {
            title: 'Endpoints',
            description: 'A list of all available endpoints',
        },

      }
    },
  }