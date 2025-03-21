import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs' // nextra-theme-blog or your custom theme

import YouTube from './components/YouTubeEmbed' 
// import ApiTester from './components/ApiTester' 


// Add your custom components here
const customComponents = {
  YouTube,
  // ApiTester
}

// Get the default MDX components
const themeComponents = getThemeComponents()

// Merge components
export function useMDXComponents(components) {
    return {
        ...themeComponents,
        ...customComponents,
        ...components
    }
}