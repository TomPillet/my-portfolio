import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react";

const pseudoNavStyles = {
    content: '""',
    position: "absolute",
    left: "0",
    width: "0%",
    height: "100%",
    transition: "all 0.3s ease-in-out",
}

const buttonRecipe = defineRecipe({
    variants: {
        link: {
            true: {
                position: "relative",
                background: "transparent",
                color: "rgb(229, 229, 229)",
                height: "100%",
                borderRadius: "0px",
                fontSize: "24px",
                fontWeight: "400",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "all 0.3s ease-in-out",

                _after: {
                    ...pseudoNavStyles,
                    backdropFilter: "invert(1)",
                },

                _before: {
                    ...pseudoNavStyles,
                    background: "black",
                    zIndex: "-1",
                },

                _hover: {
                    background: "transparent",
                    letterSpacing: "8px",
                    _after: {
                        width: "100%",
                    },
                    _before: {
                        width: "100%",
                    }
                }
            },
        },
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