"use client";
import React from "react";
import { Category, Project, Skill, SkillLevel } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Heading, Highlight, Text } from "@chakra-ui/react";

interface SkillComponentProps {
  width: string;
  height: string;
  skill: Skill;
  skillLevel?: SkillLevel;
  categories?: Category[];
  projets?: Project[];
}

export function SkillComponent({
  width,
  height,
  skill,
  skillLevel,
  categories,
  projets,
}: SkillComponentProps) {
  return (
    <Link
      style={{ display: "block", width: width, height: height }}
      href={`/competences/${skill?.slug}`}
    >
      <Flex
        pos={"relative"}
        w={"full"}
        h={"full"}
        bg="#fff"
        rounded="3xl"
        overflow={"hidden"}
        color={"dark.default"}
        cursor={"pointer"}
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
          px={{ sm: 4, base: 2 }}
          py={{ lg: 8, base: 4 }}
        >
          <Flex w="full" flexDir={"column"} mb={0}>
            <Flex w={"full"}>
              <Heading
                as="h2"
                fontSize={{ lg: "2xl", sm: "xl", base: "md" }}
                className="skill-title"
                pos={"relative"}
              >
                {skill?.title}
              </Heading>
            </Flex>
            <Text
              w={"full"}
              fontSize={{ lg: "md", base: "xs" }}
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
                fontSize={{ lg: "lg", base: "sm" }}
                lineHeight={1.2}
                w={"full"}
              >
                {projets.length > 1
                  ? `${projets.length} projets associés`
                  : "1 projet associé"}
              </Heading>
              {/* <Flex flexWrap={"wrap"} lineHeight={1.1}>
                {projets?.map((projet, index) => {
                  return (
                    <Text
                      key={index}
                      color={"dark.default"}
                      mr={1}
                      fontSize={{ lg: "lg", base: "xs" }}
                      letterSpacing={"-1px"}
                      transition={"all 0.2s ease-in-out"}
                      _hover={{
                        color: "secondary.hover",
                        letterSpacing: "0px",
                      }}
                    >
                      <Link href={`/projets/${projet.slug}`}>
                        {projet.title}
                      </Link>
                      {index !== projets.length - 1 && ","}
                    </Text>
                  );
                })}
              </Flex> */}
            </Flex>
          )}
          {skillLevel && (
            <Highlight
              query={skillLevel.label}
              styles={{
                px: "1",
                bg: "skills." + skillLevel.slug,
                fontSize: { lg: "xl", base: "sm" },
                rounded: "md",
                w: "fit",
              }}
            >
              {skillLevel.label}
            </Highlight>
          )}
        </Flex>
      </Flex>
    </Link>
  );
}
