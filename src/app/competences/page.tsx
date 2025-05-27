"use client";
import { Container, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
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
      <Flex py={"120px"} w="full" flexDir={"column"}>
        <Heading as="h1" textAlign={"center"} mb={16} variant={"mainTitle"}>
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
                color={"dark.default"}
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
                  overlayContent={
                    <CompetenceCard
                      width={competenceCardWidth}
                      height={competenceCardHeight}
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
