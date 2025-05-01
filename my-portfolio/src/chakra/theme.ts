import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { buttonRecipe } from "./button";

const customConfig = defineConfig({ 
    theme: {
        recipes: {
            button: buttonRecipe
        }
    }
})

export const system = createSystem(defaultConfig, customConfig)