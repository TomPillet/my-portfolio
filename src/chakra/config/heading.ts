import { defineRecipe } from "@chakra-ui/react";

export const headingRecipe = defineRecipe({
  variants: {
    variant: {
      mainTitle: {
        color: "light.default",
        fontSize: "6xl",
        fontWeight: "700",
        lineHeight: "1",
        textTransform: "uppercase",
      },
      secondTitle: {
        color: "light.default",
        fontSize: "4xl",
        fontWeight: "700",
        lineHeight: "1",
        textTransform: "uppercase",
      },
      skinnyTitle: {
        color: "light.default",
        fontSize: "3xl",
        fontWeight: "400",
        lineHeight: "1",
      },
    },
  },
});
