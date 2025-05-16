"use client";
import SpotlightCard from "@/reactbits/components/SpotlightCard/SpotlightCard";
import {
  Flex,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { skills } from "@/models/skills/skills";
import TiltedCard from "@/reactbits/components/TiltedCard/TiltedCard";

export default function Competences() {
  return (
    <Container maxW={"conatiner.xl"} pt="120px">
      <Heading
        as="h1"
        fontSize={"6xl"}
        textAlign={"center"}
        h="fit"
        lineHeight={2}
      >
        Mes compétences
      </Heading>
      <Grid
        templateColumns={"repeat(5, 1fr)"}
        autoRows={"200px"}
        w={"full"}
        h={"fit"}
        gap={4}
      >
        {skills.map((skill, index) => {
          return (
            <GridItem key={index} h="fit" w="fit">
              {/* <SpotlightCard className='skill-spotlight-card' spotlightColor="rgba(255, 255, 255, 0.25)">
                <Flex h="full" w="full" p={4} bg="#101010" justifyContent="center" alignItems={"center"} >
                  <Heading as="h2" fontSize={"2xl"}>{skill.title}</Heading>
                </Flex>
              </SpotlightCard> */}
              {/* TODO: TitledCard isn't optimized for mobile */}
              <TiltedCard
                imageSrc={"skills-bg.jpg"}
                altText={skill.slug}
                imageHeight={"200px"}
                imageWidth={"200px"}
                containerHeight={"200px"}
                containerWidth={"200px"}
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={<Text>{skill.title}</Text>}
              ></TiltedCard>
            </GridItem>
          );
        })}
      </Grid>
    </Container>
  );
}
