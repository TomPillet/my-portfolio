"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import DynamicUnderlineText from "../ui/DynamicUnderlineText";
import { Project } from "@prisma/client";
import ImageWithDominantColor from "../ui/ImageWithDominantColor";

export default function ProjetCard({ project }: { project: Project }) {
  const [dominantColor, setDominantColor] = useState("");

  return (
    <Box
      h="520px"
      w="320px"
      pos={"relative"}
      animation={"2s ease-in-out 0s infinite verticalFloatingAnimation"}
      transform={"scale(.9)"}
      transition={"transform .4s"}
      // TODO: use framer motion
      _hover={{
        animationPlayState: "paused",
        transform: "scale(1)",
        "& .card-image": {
          filter: "grayscale(0) !important",
        },
        "& .card-title .dynamic-underline:after": {
          width: "84%",
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
              objectFit: "cover",
              filter: "grayscale(.6)",
              transition: "all .6s ease-in-out",
            }}
          />
          <Heading
            className="card-title"
            pos={"relative"}
            p={4}
            color={"white"}
            w={"full"}
            textShadow={"2px 2px 0px #131313"}
          >
            <DynamicUnderlineText color={dominantColor}>
              {project?.title}
            </DynamicUnderlineText>
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
          {project?.description}
        </Text>
      </Flex>
    </Box>
  );
}
