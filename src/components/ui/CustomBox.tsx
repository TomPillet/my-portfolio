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
      bg={"#101010"}
      transition={"all 0.3s ease-in-out"}
      _hover={{
        background: "#161616",
        border: "1px solid #2C5E4C",
        boxShadow: "0px 0px 4px #1E5631",
        scale: "1.05",
      }}
      onMouseOver={onHover}
      onMouseOut={onOut}
    >
      {children}
    </Box>
  );
}
