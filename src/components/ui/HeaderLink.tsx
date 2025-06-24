import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Icon, useBreakpointValue } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface HeaderLinkProps {
  icon: IconType;
  route: string;
  title: string;
  isRouteActive: boolean;
}

export default function HeaderLink({
  icon,
  route,
  title,
  isRouteActive,
}: HeaderLinkProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Link href={route} style={{ height: "100%", width: "100%" }}>
      <Button
        w="full"
        variant="buttonLink"
        cursor={"pointer"}
        color={"white.default"}
        fontSize={{ lg: "2xl", md: "xl", base: "lg" }}
        {...(isRouteActive ? { _before: { width: "100%" } } : {})}
      >
        {isMobile ? <Icon as={icon} boxSize={6} /> : title}
      </Button>
    </Link>
  );
}
