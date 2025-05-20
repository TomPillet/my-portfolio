"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/chakra/config/theme";

export function Provider(props: { children: React.ReactNode }) {
  return <ChakraProvider value={system}>{props.children}</ChakraProvider>;
}
