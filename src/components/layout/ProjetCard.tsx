"use client";

import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Span,
  Text,
} from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import React, { useEffect, useState } from "react";
import { Project } from "@prisma/client";
import Image from "next/image";
import { FaHammer } from "react-icons/fa6";
import { getEtablissementById } from "@/app/services/etablissementsService";

export default function ProjetCard({
  project,
  animationDelay,
}: {
  project: Project;
  animationDelay: number;
}) {
  const [etablissementName, setEtablissementName] = useState<string>("");

  useEffect(() => {
    if (project?.etablissementId) {
      getEtablissementById(project?.etablissementId)
        .then((res) => {
          setEtablissementName(res.name);
        })
        .catch(console.error);
    }
  });

  return (
    <Flex
      minH="360px"
      w="360px"
      bg={"dark.lighter"}
      flexDir={"column"}
      pos={"relative"}
      boxShadow={"8px 8px 0px dark.darker"}
      rounded={"2xl"}
      overflow={"hidden"}
      animation={`4s .${
        animationDelay * 2
      }s infinite verticalFloatingAnimation ease-in-out`}
      transform={"scale(.9)"}
      transition={"all .4s ease-in-out"}
      cursor={"pointer"}
      _hover={{
        animationPlayState: "paused",
        transform: "scale(1)",
        "& .see-more": {
          width: "120%",
        },
      }}
    >
      <Flex h={"2/5"} mb={8} pos={"relative"} alignItems={"flex-end"}>
        <Image
          src={project?.imageUrl}
          alt={project?.title}
          fill
          style={{ objectFit: "cover" }}
        />
        {project?.isActive && (
          <Flex
            pos={"absolute"}
            top={4}
            left={4}
            p={1}
            rounded={"lg"}
            bg={"rgba(0,0,0,0.4)"}
            backdropFilter={"blur(4px)"}
          >
            <Tooltip content="Projet actif">
              <Icon as={FaHammer} color={"primary.hover"} />
            </Tooltip>
          </Flex>
        )}
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
      <Grid h={"3/5"} px={4} gridTemplateRows={"repeat(10, 1fr"}>
        <GridItem rowSpan={1} w={"full"}>
          <Flex flexDir={"row"} h={"full"} w={"full"} gap={2}>
            <Text ml={2} fontSize={"1em"} letterSpacing={1} lineHeight={1.6}>
              {project?.date.toString().slice(0, 4)}
            </Text>
            <Text fontSize={"1em"} letterSpacing={1} lineHeight={1.6}>
              - {project?.type}
            </Text>
            {project?.etablissementId && (
              <Text fontSize={"1em"} letterSpacing={1} lineHeight={1.6}>
                - {etablissementName}
              </Text>
            )}
          </Flex>
        </GridItem>
        <GridItem rowSpan={6} px={8}>
          <Text mb={4} fontSize={"1em"} letterSpacing={1} lineHeight={1.6}>
            {project?.shortDescription}
          </Text>
        </GridItem>
        {/* <GridItem rowSpan={3} px={8}>
          <Flex
            alignItems={"center"}
            justifyContent={
              project?.hostUrl && project?.gitUrl ? "space-between" : "center"
            }
          >
            {project?.hostUrl && (
              <Link href={project?.hostUrl} target="_blank">
                <Icon
                  as={FaExternalLinkAlt}
                  w={8}
                  h={8}
                  color={"primary.default"}
                  transition={"all 0.2s ease-in-out"}
                  _hover={{ color: "primary.hover", w: 10, h: 10 }}
                />
              </Link>
            )}
            {project?.gitUrl && (
              <Link href={project?.gitUrl} target="_blank">
                <Icon
                  as={FaGithub}
                  w={10}
                  h={10}
                  color={"primary.default"}
                  transition={"all 0.2s ease-in-out"}
                  _hover={{ color: "primary.hover", w: 12, h: 12 }}
                />
              </Link>
            )}
          </Flex>
        </GridItem> */}
      </Grid>
    </Flex>
  );
}
