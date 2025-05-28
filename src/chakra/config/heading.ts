import { defineRecipe } from "@chakra-ui/react";

export const headingRecipe = defineRecipe({
  variants: {
    variant: {
      mainTitle: {
        color: "light.default",
        fontSize: { md: "6xl", sm: "5xl", base: "4xl" },
        fontWeight: "700",
        lineHeight: "1",
        textAlign: "center",
        textTransform: "uppercase",
      },
      secondTitle: {
        color: "light.default",
        fontSize: { md: "4xl", base: "3xl" },
        fontWeight: "700",
        lineHeight: "1",
        textAlign: "center",
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
