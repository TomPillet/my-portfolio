import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react";

const buttonRecipe = defineRecipe({
  variants: {
      link: {
        true: {
            border: "2px solid white",
            background: "rgba(0, 0, 0, 0.2)",
            color: "white"
        }
      }
  }  
})

const customConfig = defineConfig({
    theme: {
        recipes: {
            button: buttonRecipe
        }
    }
})

export const system = createSystem(defaultConfig, customConfig)