import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Semantic names for your specific design
        brand: {
          canvas: { value: "#f8f9f7" },    // Global background
          grid: { value: "#e2e4df" },      // Grid lines
          surface: { value: "#ffffff" },   // Card background
          primary: { value: "#ffc107" },   // The yellow button
          accent: { value: "#00a78e" },    // The teal link
          dark: { value: "#1a1a1a" },      // Deep text/headings
          login : {value:"#f9f8f3"},
          loginBox: {value : "#fafaf3"}
          
        },
      },
    },
    // Semantic tokens help with light/dark mode logic automatically
    semanticTokens: {
      colors: {
        mainBg: { value: "{colors.brand.canvas}" },
        cardBg: { value: "{colors.brand.surface}" },
      }
    }
  },
})

export const themeColorSystem = createSystem(defaultConfig, customConfig)