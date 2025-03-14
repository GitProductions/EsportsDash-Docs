
// need to lowercase all endpoints.. aka 'StreamDeck' -> 'streamdeck'
// this is the docs.esportsdash.com/StreamDeck for example which is not good to have uppercase letters in the url

export default {
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

    'support': {
        title: 'Support',
        type: 'page',
    },
    'Home': {
        title: 'Home',
        href: 'https://esportsdash.com',
        type: 'page'
    },


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

    'user-interface': {
        title: 'User Interface 🚧'
    }
    

    
}