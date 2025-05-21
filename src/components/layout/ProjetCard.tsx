"use client";

import { Box, Flex, Heading, Span, Text } from "@chakra-ui/react";
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
        "& .see-more": {
          width: "120%",
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
          <Heading
            pos={"relative"}
            h={"fit"}
            w={"fit"}
            overflow={"hidden"}
            rounded={"xl"}
            bottom={2}
            left={4}
            color={"light.default"}
            fontFamily={"DM Sans"}
            fontSize={"lg"}
            fontWeight={"600"}
            lineHeight={1}
          >
            <Flex
              className="see-more"
              pos="absolute"
              width={"0%"}
              height={"100%"}
              bg="primary.hover"
              left={"-10%"}
              top={0}
              justifyContent={"center"}
              alignItems={"center"}
              overflow={"hidden"}
              transform={"skewX(-16deg)"}
              transition={"all 0.3s"}
              zIndex={1}
            >
              <Span
                textTransform={"uppercase"}
                textWrap={"nowrap"}
                letterSpacing={"-1px"}
              >
                {project?.title}
              </Span>
            </Flex>
            <Text
              h={"fit"}
              w={"fit"}
              px={6}
              py={3}
              bg={"rgba(0,0,0,0.4)"}
              backdropFilter={"blur(4px)"}
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
