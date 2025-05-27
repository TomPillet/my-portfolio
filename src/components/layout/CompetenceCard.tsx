import React, { useEffect, useState } from "react";
import { Category, Project, Skill, SkillLevel } from "@prisma/client";
import Image from "next/image";
import { Box, Flex, Heading, Highlight, Text } from "@chakra-ui/react";
import Link from "next/link";
import { getCategories } from "@/app/services/categoriesService";

interface CompetenceCardProps {
  width: string;
  height: string;
  skill: Skill;
  skillLevel: SkillLevel;
  categories?: Category[];
  projets?: Project[];
}

export function CompetenceCard({
  width,
  height,
  skill,
  skillLevel,
  categories,
  projets,
}: CompetenceCardProps) {
  return (
    <Flex
      pos={"relative"}
      w={width}
      h={height}
      bg="#fff"
      rounded="3xl"
      overflow={"hidden"}
      _hover={{
        "& .skill-categories": {
          opacity: 1,
        },
        "& .skill-image": {
          filter: "blur(12px)",
        },
        "& .skill-projects": {
          opacity: 1,
        },
      }}
    >
      <Box
        opacity={0.6}
        h={"40%"}
        w={"40%"}
        m={"auto"}
        pos={"relative"}
        zIndex={1}
        transition={"all 0.4s ease-in-out"}
        className="skill-image"
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
        <Flex w="full" flexDir={"column"} mb={0}>
          <Flex w={"full"}>
            <Heading w={"4/5"} as="h2" fontSize={"2xl"}>
              {skill?.title}
            </Heading>
          </Flex>
          <Text
            w={"full"}
            fontStyle={"italic"}
            textTransform={"lowercase"}
            opacity={0}
            transition={"all 0.4s ease-in-out"}
            className="skill-categories"
            pl={1}
          >
            {categories?.map((category) => category.title).join(", ")}
          </Text>
        </Flex>
        {projets && (
          <Flex
            flexDir={"column"}
            className="skill-projects"
            opacity={0}
            transition={"all 0.4s ease-in-out"}
          >
            <Heading
              as="h3"
              fontSize={"lg"}
              lineHeight={1.2}
              textDecoration={"underline"}
              w={"full"}
            >
              Projets associés :
            </Heading>
            <Flex flexWrap={"wrap"} lineHeight={1.1}>
              {projets?.map((projet, index) => {
                return (
                  <Text
                    key={index}
                    color={"dark.default"}
                    mr={1}
                    letterSpacing={"-1px"}
                    transition={"all 0.2s ease-in-out"}
                    _hover={{
                      color: "secondary.hover",
                      letterSpacing: "0px",
                    }}
                  >
                    <Link href={`/projets/${projet.slug}`}>{projet.title}</Link>
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
