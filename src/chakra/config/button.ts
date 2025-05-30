import { defineRecipe } from "@chakra-ui/react";

const pseudoNavStyles = {
  content: '""',
  position: "absolute",
  left: "0",
  width: "0%",
  height: "100%",
  transition: "all 0.3s ease-in-out",
  // backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,.01), transparent)",
};

export const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      buttonLink: {
        position: "relative",
        paddingY: "24px !important",
        background: "transparent",
        color: "rgb(229, 229, 229)",
        border: "none",
        height: "100%",
        borderRadius: "0px",
        fontSize: "24px",
        fontWeight: "400",
        letterSpacing: "1px",
        textTransform: "uppercase",
        transition: "all 0.3s ease-in-out",

        _before: {
          ...pseudoNavStyles,
          borderTop: "2px solid white",
          zIndex: "-1",
        },

        _hover: {
          background: "transparent",
          letterSpacing: "8px",
          _before: {
            width: "100%",
          },
        },
      },
    },
  },
});
