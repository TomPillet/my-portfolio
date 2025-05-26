import { Button } from "@chakra-ui/react";
import React from "react";

export default function CustomButton({
  children,
  ...props
}: {
  children: React.ReactNode;
  [props: string]: any;
}) {
  return (
    <Button
      p={4}
      border={"1px solid"}
      borderColor={"primary.default"}
      borderRadius={"xl"}
      color={"primary.default"}
      bg={"dark.lighter"}
      _hover={{
        borderColor: "primary.hover",
        color: "primary.hover",
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
