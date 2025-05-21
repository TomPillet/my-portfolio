"use client";

import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  return (
    <Flex h="200px" w="full" pos="absolute">
      <Flex
        h="1/3"
        w="full"
        justifyContent="space-around"
        pos="relative"
        zIndex={1}
      >
        <Link href="/" style={{ height: "100%", width: "100%" }}>
          <Button
            w="full"
            variant="buttonLink"
            cursor={"pointer"}
            color={"light"}
          >
            Accueil
          </Button>
        </Link>
        <Link href="/competences" style={{ height: "100%", width: "100%" }}>
          <Button
            w="full"
            variant="buttonLink"
            cursor={"pointer"}
            color={"light"}
          >
            Compétences
          </Button>
        </Link>
        <Link href="/projets" style={{ height: "100%", width: "100%" }}>
          <Button
            w="full"
            variant="buttonLink"
            cursor={"pointer"}
            color={"light"}
          >
            Projets
          </Button>
        </Link>
        <Link href="/contact" style={{ height: "100%", width: "100%" }}>
          <Button
            w="full"
            variant="buttonLink"
            cursor={"pointer"}
            color={"light"}
          >
            Contact
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
