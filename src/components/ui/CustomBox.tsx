import React from "react";
import { Box } from "@chakra-ui/react";

export default function CustomBox({
  children,
  onHover,
  onOut,
  ...props
}: {
  children: React.ReactNode;
  onHover?: () => void;
  onOut?: () => void;
}) {
  return (
    <Box
      {...props}
      border={"1px solid rgba(255,255,255,0.4)"}
      borderRadius={"10px"}
      px={"20px"}
      py={"12px"}
      width={"fit"}
      bg={"dark.darker"}
      transition={"all 0.3s ease-in-out"}
      _hover={{
        background: "dark.lighter",
        border: "1px solid primary.default",
        boxShadow: "0px 0px 4px secondary.default",
        scale: "1.05",
      }}
      onMouseOver={onHover}
      onMouseOut={onOut}
    >
      {children}
    </Box>
  );
}
