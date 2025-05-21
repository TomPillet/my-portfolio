import { defineRecipe } from "@chakra-ui/react";

export const headingRecipe = defineRecipe({
  variants: {
    variant: {
      mainTitle: {
        color: "light.default",
        fontSize: "6xl",
        fontWeight: "700",
        lineHeight: "2",
        textAlign: "center",
        textTransform: "uppercase",
      },
      secondTitle: {
        color: "light.default",
        fontSize: "4xl",
        fontWeight: "700",
        lineHeight: "2",
        textAlign: "center",
        textTransform: "uppercase",
      },
    },
  },
});
