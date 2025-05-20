import React from "react";
import { Text } from "@chakra-ui/react";

export default function DynamicUnderlineText({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <Text
      className="dynamic-underline"
      _after={{
        content: "''",
        position: "relative",
        height: "2px",
        width: "0%",
        display: "block",
        filter: "invert(1)",
        transition: "all .6s ease-in-out",
        bg: color,
      }}
    >
      {children}
    </Text>
  );
}
