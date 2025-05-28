"use client";
import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Category, Project, Skill, SkillLevel } from "@prisma/client";
import TiltedCard from "@/reactbits/components/TiltedCard/TiltedCard";
import { CompetenceCard } from "@/components/layout/CompetenceCard";
import { getSkills } from "../services/skillsService";
import { getSkillLevelById } from "@/app/services/skillLevelService";
import { getCategoriesBySkills } from "../actions/categoriesOnSkills";
import { getProjectsBySkills } from "../actions/projectsOnSkills";

const competenceCardHeight = "260px";
const competenceCardWidth = "240px";
const competenceCardHeightMobile = "210px";
const competenceCardWidthMobile = "190px";
const competenceCardHeightBase = "160px";
const competenceCardWidthBase = "140px";

export default function Competences() {
  const [categoriesBySkills, setCategoriesBySkills] = useState<
    Record<number, Category[]>
  >({});
  const [projectsBySkills, setProjectsBySkills] = useState<
    Record<number, Project[]>
  >({});
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsLevels, setSkillsLevels] = useState<Record<number, SkillLevel>>(
    {}
  );

  const breakpoint = useBreakpointValue({
    base: "base",
    sm: "sm",
    lg: "lg",
  });
  const getCardSizes = (): Record<string, string> => {
    return {
      height:
        breakpoint === "base"
          ? competenceCardHeightBase
          : breakpoint === "sm"
            ? competenceCardHeightMobile
            : competenceCardHeight,
      width:
        breakpoint === "base"
          ? competenceCardWidthBase
          : breakpoint === "sm"
            ? competenceCardWidthMobile
            : competenceCardWidth,
    };
  };

  useEffect(() => {
    getSkills()
      .then((res: Skill[]) => setSkills(res))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (skills.length === 0) return;

    const skillIds = skills.map((skill) => skill.id);

    getCategoriesBySkills(skillIds)
      .then((res: Record<number, Category[]>) => {
        setCategoriesBySkills(res);
      })
      .catch(console.error);

    getProjectsBySkills(skillIds)
      .then((res: Record<number, Project[]>) => {
        setProjectsBySkills(res);
      })
      .catch(console.error);
  }, [skills]);

  useEffect(() => {
    const levelIds = [...new Set(skills.map((skill) => skill.levelId))];

    levelIds.forEach((levelId) => {
      if (!skillsLevels[levelId]) {
        getSkillLevelById(levelId)
          .then((res) => {
            setSkillsLevels((prev) => ({
              ...prev,
              [levelId]: res,
            }));
          })
          .catch(console.error);
      }
    });
  }, [skills, skillsLevels]);

  return (
    <Container maxW={"7xl"}>
      <Flex py={{ lg: "120px", base: "100px" }} w="full" flexDir={"column"}>
        <Heading
          as="h1"
          textAlign={"center"}
          mb={{ lg: 16, base: 8 }}
          variant={"mainTitle"}
        >
          Mes compétences
        </Heading>
        <Grid
          templateColumns={{
            xl: "repeat(4, 1fr)",
            md: "repeat(3, 1fr)",
            base: "repeat(2, 1fr)",
          }}
          autoRows={getCardSizes()?.height}
          w={"fit"}
          h={"fit"}
          m={"auto"}
          gap={{ lg: 16, sm: 8, base: 6 }}
        >
          {skills?.map((skill, index) => {
            return (
              <GridItem
                key={index}
                h="fit"
                w="fit"
                color={"dark.default"}
                className="skill-card"
              >
                {/* TODO: TitledCard isn't optimized for mobile */}
                <TiltedCard
                  imageSrc={"https://cataas.com/cat"}
                  altText={skill?.slug}
                  imageHeight={getCardSizes()?.height}
                  imageWidth={getCardSizes()?.width}
                  containerHeight={getCardSizes()?.height}
                  containerWidth={getCardSizes()?.width}
                  rotateAmplitude={12}
                  scaleOnHover={1.2}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <CompetenceCard
                      width={getCardSizes()?.width}
                      height={getCardSizes()?.height}
                      skill={skill}
                      skillLevel={skillsLevels[skill.levelId]}
                      categories={categoriesBySkills[skill.id]}
                      projets={projectsBySkills[skill.id]}
                    />
                  }
                ></TiltedCard>
              </GridItem>
            );
          })}
        </Grid>
      </Flex>
    </Container>
  );
}
