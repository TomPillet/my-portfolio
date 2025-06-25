"use client";

import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { IoIosHome, IoIosMail } from "react-icons/io";
import { FaTableList, FaTimeline } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import HeaderLink from "../ui/HeaderLink";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrollY, setScrollY] = React.useState(1);
  const pathname = usePathname();

  useEffect(() => {
    setScrollY(window.scrollY);
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
      bg={scrollY > 0 ? "dark.default" : "transparent"}
      transition={"all 0.2s ease-in-out"}
    >
      <HeaderLink
        icon={IoIosHome}
        route="/"
        title="Accueil"
        isRouteActive={pathname === "/"}
      />
      <HeaderLink
        icon={FaStar}
        route="/competences"
        title="Compétences"
        isRouteActive={pathname.includes("/competences")}
      />
      <HeaderLink
        icon={FaTimeline}
        route="/experiences"
        title="Expériences"
        isRouteActive={pathname === "/experiences"}
      />
      <HeaderLink
        icon={FaTableList}
        route="/projets"
        title="Projets"
        isRouteActive={pathname.includes("/projets")}
      />
      <HeaderLink
        icon={IoIosMail}
        route="/contact"
        title="Contact"
        isRouteActive={pathname === "/contact"}
      />
    </Flex>
  );
}
