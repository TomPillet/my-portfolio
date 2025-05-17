"use client";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Highlight,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Skill, skills } from "@/models/skill";
import TiltedCard from "@/reactbits/components/TiltedCard/TiltedCard";
import Image from "next/image";

const competenceCardHeight = "260px";
const competenceCardWidth = "240px";

export default function Competences() {
  return (
    <Container maxW={"conatiner.xl"} pt="120px">
      <Heading
        as="h1"
        fontSize={"6xl"}
        textAlign={"center"}
        h="fit"
        lineHeight={2}
        mb={8}
      >
        Mes compétences
      </Heading>
      <Grid
        templateColumns={"repeat(4, 1fr)"}
        autoRows={competenceCardHeight}
        w={"fit"}
        h={"fit"}
        m={"auto"}
        gap={16}
      >
        {skills?.map((skill, index) => {
          return (
            <GridItem
              key={index}
              h="fit"
              w="fit"
              color={"#131313"}
              className="skill-card"
            >
              {/* TODO: TitledCard isn't optimized for mobile */}
              <TiltedCard
                imageSrc={"https://cataas.com/cat"}
                altText={skill?.slug}
                imageHeight={competenceCardHeight}
                imageWidth={competenceCardWidth}
                containerHeight={competenceCardHeight}
                containerWidth={competenceCardWidth}
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={<CompetenceCard skill={skill} />}
              ></TiltedCard>
            </GridItem>
          );
        })}
      </Grid>
    </Container>
  );
}

interface CompetenceCardProps {
  skill: Skill;
}

function CompetenceCard({ skill }: CompetenceCardProps) {
  return (
    <Flex
      pos={"relative"}
      w={competenceCardWidth}
      h={competenceCardHeight}
      bg="#F5F5F5"
      rounded="3xl"
      overflow={"hidden"}
    >
      <Box
        filter={"grayscale(1) brightness(.6) blur(1px)"}
        opacity={0.05}
        h={"50%"}
        w={"50%"}
        m={"auto"}
        pos={"relative"}
        zIndex={1}
      >
        <Image
          src={skill?.logo}
          alt={skill?.slug}
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>
      <Flex
        w={competenceCardWidth}
        h={competenceCardHeight}
        pos={"absolute"}
        zIndex={2}
        flexDir={"column"}
        justifyContent={"space-between"}
        px={4}
        py={8}
      >
        <Flex w="full" flexDir={"column"}>
          <Flex w={"full"}>
            <Heading w={"4/5"} as="h2" fontSize={"2xl"}>
              {skill?.title}
            </Heading>
            {/* logo */}
          </Flex>
          <Text w={"full"} fontStyle={"italic"}>
            {skill?.type}
          </Text>
        </Flex>
        <Flex flexDir={"column"}>
          <Heading as="h3" fontSize={"lg"} w={"full"}>
            Projets :
          </Heading>
          <Flex flexWrap={"wrap"} lineHeight={1.1}>
            {skill?.projets?.map((projet, index) => {
              return (
                <Text key={index} mr={1}>
                  {projet?.title}
                  {index !== skill?.projets?.length - 1 && ","}
                </Text>
              );
            })}
          </Flex>
        </Flex>
        <Highlight
          query={skill?.level?.label}
          styles={{ px: "1", bg: skill?.level?.color, rounded: "md", w: "fit" }}
        >
          {skill?.level?.label}
        </Highlight>
      </Flex>
    </Flex>
  );
}
