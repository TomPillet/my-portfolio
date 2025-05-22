import React from "react";
import { Project, Skill, SkillLevel } from "@prisma/client";
import Image from "next/image";
import { Box, Flex, Heading, Highlight, Text } from "@chakra-ui/react";

interface CompetenceCardProps {
  width: string;
  height: string;
  skill: Skill;
  skillLevel: SkillLevel;
  projets?: Project[];
}

export function CompetenceCard({
  width,
  height,
  skill,
  skillLevel,
  projets,
}: CompetenceCardProps) {
  return (
    <Flex
      pos={"relative"}
      w={width}
      h={height}
      bg="#F5F5F5"
      rounded="3xl"
      overflow={"hidden"}
    >
      <Box
        opacity={0.05}
        h={"50%"}
        w={"50%"}
        m={"auto"}
        pos={"relative"}
        zIndex={1}
      >
        <Image
          src={skill?.logoUrl}
          alt={skill?.slug}
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>
      <Flex
        w={width}
        h={height}
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
          </Flex>
          <Text w={"full"} fontStyle={"italic"} textTransform={"lowercase"}>
            {skill?.type}
          </Text>
        </Flex>
        {projets && (
          <Flex flexDir={"column"}>
            <Heading as="h3" fontSize={"lg"} w={"full"}>
              Projets :
            </Heading>
            <Flex flexWrap={"wrap"} lineHeight={1.1}>
              {projets.map((projet, index) => {
                return (
                  <Text key={index} mr={1}>
                    {projet.title}
                    {index !== projets.length - 1 && ","}
                  </Text>
                );
              })}
            </Flex>
          </Flex>
        )}
        {skillLevel && (
          <Highlight
            query={skillLevel.label}
            styles={{
              px: "1",
              bg: "skills." + skillLevel.slug,
              rounded: "md",
              w: "fit",
            }}
          >
            {skillLevel.label}
          </Highlight>
        )}
      </Flex>
    </Flex>
  );
}
