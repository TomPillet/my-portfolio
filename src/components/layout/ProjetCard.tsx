"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Project } from "@prisma/client";
import ImageWithDominantColor from "../ui/ImageWithDominantColor";

export default function ProjetCard({
  project,
  animationDelay,
}: {
  project: Project;
  animationDelay: number;
}) {
  const [dominantColor, setDominantColor] = useState("");

  return (
    <Box
      h="520px"
      w="360px"
      pos={"relative"}
      animation={`2s ease-in-out .${
        animationDelay * 2
      }s infinite verticalFloatingAnimation`}
      transform={"scale(.9)"}
      transition={"transform .4s"}
      // TODO: use framer motion
      _hover={{
        animationPlayState: "paused",
        transform: "scale(1)",
        "& .card-image": {
          filter: "brightness(1) !important",
          borderWidth: "10px !important",
        },
      }}
    >
      <Flex
        h={"full"}
        w={"full"}
        bg={"#161616"}
        rounded={"2xl"}
        boxShadow={"8px 8px 0px #101010"}
        flexDir={"column"}
        overflow={"hidden"}
      >
        <Flex h={"36%"} mb={8} pos={"relative"} alignItems={"flex-end"}>
          <ImageWithDominantColor
            imageUrl={project?.imageUrl}
            onDominantColorFound={(color) => setDominantColor(color)}
            className="card-image"
            alt="project-image"
            style={{
              borderBottom: `0px solid ${dominantColor}`,
              objectFit: "cover",
              filter: "brightness(.9)",
              transition: "all .4s ease-in-out",
            }}
          />
          <Heading pos={"relative"} p={4}>
            <Text
              h={"fit"}
              w={"fit"}
              px={4}
              py={2}
              color={"white"}
              fontFamily={"DM Sans"}
              fontSize={18}
              fontWeight={"900"}
              bg={"rgba(0,0,0,0.4)"}
              backdropFilter={"blur(4px)"}
              rounded={"2xl"}
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
