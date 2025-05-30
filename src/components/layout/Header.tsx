"use client";

import React, { useEffect } from "react";
import { Flex, Button, useBreakpointValue, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosHome, IoIosMail } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

export default function Header() {
  const [scrollY, setScrollY] = React.useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  });

  return (
    <Flex
      h="fit"
      w="full"
      pos="fixed"
      zIndex={1}
      justifyContent="space-around"
      bg={scrollY > 0 ? "dark.lighter" : "dark.default"}
      transition={"all 0.3s ease-in-out"}
    >
      <Link href="/" style={{ height: "100%", width: "100%" }}>
        <Button
          w="full"
          variant="buttonLink"
          cursor={"pointer"}
          color={"white.default"}
          {...(pathname === "/" ? { _before: { width: "100%" } } : {})}
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
          {...(pathname === "/competences"
            ? { _before: { width: "100%" } }
            : {})}
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
          {...(pathname === "/projets" ? { _before: { width: "100%" } } : {})}
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
          {...(pathname === "/contact" ? { _before: { width: "100%" } } : {})}
        >
          {isMobile ? <Icon as={IoIosMail} boxSize={6} /> : "Contact"}
        </Button>
      </Link>
    </Flex>
  );
}
