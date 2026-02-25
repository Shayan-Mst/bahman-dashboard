"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { themeColorSystem } from "@/src/components/lib/theme"
export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider  value={themeColorSystem}>
      
      <ColorModeProvider  {...props} />
      
    </ChakraProvider>
  )
}
