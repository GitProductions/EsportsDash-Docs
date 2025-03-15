
// need to lowercase all endpoints.. aka 'StreamDeck' -> 'streamdeck'
// this is the docs.esportsdash.com/StreamDeck for example which is not good to have uppercase letters in the url


export default {

    // Top level navigation
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


    // Sidebar navigation
    'index':
    {
        title: 'Getting Started 🚀',
        // theme: {
        //     sidebar: false // Hide sidebar on this page
        //   }
    },
    'api': {
        title: 'API ',
    },

    'streamdeck': {
        title: 'Stream Deck Plugin'
    },

    'user-interface': {
        title: 'User Interface 🚧'
    }
   



    // this is some sort of seperator thats based on a folder/mdxx but when you use it as such it doesnt render it??

    // StreamDeck: 'Intro',
    // '--': {
    //   type: 'separator',
    //   title: (
    //     <div className="flex items-center gap-2">
    //       {/* <Video /> */}
    //       Stream Deck Plugin
    //       {/* {children} */}
    //     </div>
    //   )
    // },




}