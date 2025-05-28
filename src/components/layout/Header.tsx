"use client";

import React from "react";
import { Flex, Button, useBreakpointValue, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { IoIosHome, IoIosMail } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

export default function Header() {
  const isMobile = useBreakpointValue({ base: true, md: false });
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
            color={"white.default"}
          >
            {isMobile ? <Icon as={IoIosHome} boxSize={6} /> : "Accueil"}
          </Button>
        </Link>
        <Link href="/competences" style={{ height: "100%", width: "100%" }}>
          <Button
            w="full"
            variant="buttonLink"
            cursor={"pointer"}
            color={"white.default"}
          >
            {isMobile ? <Icon as={FaStar} boxSize={6} /> : "Compétences"}
          </Button>
        </Link>
        <Link href="/projets" style={{ height: "100%", width: "100%" }}>
          <Button
            w="full"
            variant="buttonLink"
            cursor={"pointer"}
            color={"white.default"}
          >
            {isMobile ? <Icon as={FaTableList} boxSize={6} /> : "Projets"}
          </Button>
        </Link>
        <Link href="/contact" style={{ height: "100%", width: "100%" }}>
          <Button
            w="full"
            variant="buttonLink"
            cursor={"pointer"}
            color={"white.default"}
          >
            {isMobile ? <Icon as={IoIosMail} boxSize={6} /> : "Contact"}
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
