// look at the llm repo that uses same library and has a middleware of sorts to give meta data per file in a single location...




export default {




  index: {
    title: '🚀 Getting Started',
  },



  // User Interface Docs
  'user-interface': {
    title: 'User Interface',
    items: {
      'introduction': {
        title: 'Introduction',
        // display: 'hidden'
      },

      'match-tab': {
        title: 'Match Tab 🚧',

      },

      'showinfo-tab': {
        title: 'Show Info 🚧',
      },

      'bracket-tab': {
        title: 'Bracket Tab 🚧',
      },

      'obs-tab': {
        title: 'OBS Tab 🚧',
      },

      'replay-tab': {
        title: 'Replay Tab 🚧',
      },

      'teammanager-tab': {
        title: 'Team Manager 🚧'
      },

    }
  },

  // Stream Deck Docs
  streamdeck: {
    title: 'Stream Deck',
    items: {

      'streamdeck-installation': {
        title: 'Introduction',
      },

      'streamdeck-controls': {
        title: 'Controls',
      }
    },
  },


  // API Documentation
  api: {
    title: 'API',
    items: {

      'api-introduction': {
        title: 'Introduction',
        // display: 'hidden',
      },

      'api-endpoints': {
        title: 'Endpoints',
      },



    }
  },



  overlays: {
    title: 'Overlays',
    items: {

      introduction: {
        title: 'Introduction',
      },

      default: {
        title: 'Default Overlay',
        items: {
          'available-scenes': {
            title: 'Available Scenes',
          },
         
        }
      },
    }
  },

  'install-game-configs': {
    title: 'Game Configs',
  },







  // Top Navigation Menu for Website 
  website: {
    title: 'Website',
    type: 'menu',
    items: {

      'Home': {
        title: 'EsportsDash',
        href: 'https://esportsdash.com',
      },
      download: {
        title: 'Download Esports Dash',
        href: 'https://esportsdash.com/downloads',
      },
      contact: {
        title: 'Contact Us',
        href: 'mailto:hi@example.com'
      },
    }
  },

  support: {
    title: 'Support',
    type: 'page',
    theme: {
      layout: 'full',
    }

  },
}