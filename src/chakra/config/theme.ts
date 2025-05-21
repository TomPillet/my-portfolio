import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { buttonRecipe } from "./button";
import { headingRecipe } from "./heading";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        dark: {
          default: { value: "#131313" },
          darker: { value: "#101010" },
          lighter: { value: "#161616" },
        },
        light: { default: { value: "#FCF8E8" }, dirty: { value: "#b2b2b2" } },
        primary: {
          default: { value: "#2C5E4C" },
          hover: { value: "#3A7A62" },
          focus: { value: "#1E4A3A" },
          pressed: { value: "#163A2C" },
        },
        secondary: {
          default: { value: "#1E5631" },
          hover: { value: "#287242" },
          focus: { value: "#164226" },
          pressed: { value: "#0e2e1b" },
        },
        tertiary: {
          default: { value: "#164A20" },
          hover: { value: "#1f622a" },
          focus: { value: "#103a1a" },
          pressed: { value: "#0a2a12" },
        },
        skills: {
          junior: { value: "#B8E2A1" },
          intermediate: { value: "#A3E4D7" },
          confirmed: { value: "#F5B7B1" },
          expert: { value: "#D7BDE2" },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
      heading: headingRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
