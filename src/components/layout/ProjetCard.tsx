"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Project } from "@prisma/client";
import Image from "next/image";

export default function ProjetCard({
  project,
  animationDelay,
}: {
  project: Project;
  animationDelay: number;
}) {
  return (
    <Box
      h="520px"
      w="360px"
      pos={"relative"}
      boxShadow={"8px 8px 0px dark.darker"}
      rounded={"2xl"}
      overflow={"hidden"}
      animation={`4s .${
        animationDelay * 2
      }s infinite verticalFloatingAnimation ease-in-out`}
      transform={"scale(.9)"}
      transition={"all .4s ease-in-out"}
      // TODO: use framer motion
      _hover={{
        animationPlayState: "paused",
        transform: "scale(1)",
        "& .card-title": {
          bg: "primary.pressed",
        },
      }}
    >
      <Flex h={"full"} w={"full"} bg={"dark.lighter"} flexDir={"column"}>
        <Flex h={"36%"} mb={8} pos={"relative"} alignItems={"flex-end"}>
          <Image
            src={project?.imageUrl}
            alt={project?.title}
            fill
            style={{ objectFit: "cover" }}
          />
          <Heading pos={"relative"} p={4}>
            <Text
              h={"fit"}
              w={"fit"}
              px={4}
              py={2}
              color={"white.default"}
              fontFamily={"DM Sans"}
              fontSize={18}
              fontWeight={"900"}
              bg={"rgba(0,0,0,0.4)"}
              backdropFilter={"blur(4px)"}
              rounded={"2xl"}
              transition={"all .4s ease-in-out"}
              className="card-title"
            >
              {project?.title}
            </Text>
          </Heading>
        </Flex>
        <Text
          h={"36%"}
          px={8}
          mb={4}
          fontSize={"1em"}
          letterSpacing={1}
          lineHeight={1.6}
        >
          {project?.shortDescription}
        </Text>
      </Flex>
    </Box>
  );
}
