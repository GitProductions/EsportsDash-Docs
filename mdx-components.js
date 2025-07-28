import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs' // nextra-theme-blog or your custom theme

import YouTube from './components/YouTubeEmbed' 
// import ApiTester from './components/ApiTester' 
import JsonViewer from './components/JsonViewer'


const customComponents = {
  YouTube,
  JsonViewer
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