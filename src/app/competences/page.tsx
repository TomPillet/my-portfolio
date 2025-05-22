"use client";
import { Container, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Skill, SkillLevel } from "@prisma/client";
import TiltedCard from "@/reactbits/components/TiltedCard/TiltedCard";
import { CompetenceCard } from "@/components/layout/CompetenceCard";
import { getSkills } from "../services/skillsService";
import { getSkillLevelById } from "@/app/services/skillLevelService";

const competenceCardHeight = "260px";
const competenceCardWidth = "240px";

export default function Competences() {
  const [skills, setSkills] = React.useState<Skill[]>([]);
  const [skillLevels, setSkillLevels] = React.useState<
    Record<number, SkillLevel>
  >({});
  const [selectedLevel, setSelectedLevel] = React.useState<string | null>(null);
  const [selectedType, setSelectedType] = React.useState<string | null>(null);

  useEffect(() => {
    getSkills()
      .then((res: Skill[]) => setSkills(res))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const levelIds = [...new Set(skills.map((skill) => skill.levelId))];

    levelIds.forEach((levelId) => {
      if (!skillLevels[levelId]) {
        getSkillLevelById(levelId)
          .then((res) => {
            setSkillLevels((prev) => ({
              ...prev,
              [levelId]: res,
            }));
          })
          .catch(console.error);
      }
    });
  }, [skills, skillLevels]);

  return (
    <Container maxW={"7xl"}>
      <Flex pt={"120px"} w="full" flexDir={"column"}>
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
                      skillLevel={skillLevels[skill.levelId]}
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
