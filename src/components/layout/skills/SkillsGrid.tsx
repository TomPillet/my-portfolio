"use client";
import { Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SkillCard from "./SkillCard";
import { Skill, SkillLevel, Category, Project } from "@prisma/client";
import { getCategoriesBySkills } from "@/app/actions/categoriesOnSkills";
import { getProjectsBySkills } from "@/app/actions/projectsOnSkills";

interface SkillGridProps {
  skills: Skill[];
  skillsLevels: Record<number, SkillLevel>;
}

export default function SkillsGrid({ skills, skillsLevels }: SkillGridProps) {
  const [categoriesBySkills, setCategoriesBySkills] = useState<
    Record<number, Category[]>
  >({});
  const [projectsBySkills, setProjectsBySkills] = useState<
    Record<number, Project[]>
  >({});

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

  return (
    <Grid
      templateColumns={{
        xl: "repeat(4, 1fr)",
        md: "repeat(3, 1fr)",
        base: "repeat(2, 1fr)",
      }}
      autoRows={"1fr"}
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
            <SkillCard
              skill={skill}
              skillLevel={skillsLevels && skillsLevels[skill.levelId!]}
              categories={categoriesBySkills[skill.id]}
              projects={projectsBySkills[skill.id]}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
}
