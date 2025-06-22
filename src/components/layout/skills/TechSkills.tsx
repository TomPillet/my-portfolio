"use client";

import { Skill, SkillLevel } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { getSkillLevelById } from "@/app/services/skillLevelService";
import { getTechSkills } from "@/app/services/skillsService";
import SkillsGrid from "./SkillsGrid";

export default function TechSkills() {
  const [techSkills, setTechSkills] = useState<Skill[]>([]);
  const [techSkillsLevels, setTechSkillsLevels] = useState<
    Record<number, SkillLevel>
  >({});

  useEffect(() => {
    getTechSkills()
      .then((res: Skill[]) => setTechSkills(res))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const levelIds = [...new Set(techSkills.map((skill) => skill.levelId))];
    levelIds.forEach((levelId) => {
      if (levelId != null && !techSkillsLevels[levelId]) {
        getSkillLevelById(levelId)
          .then((res) => {
            setTechSkillsLevels((prev) => ({
              ...prev,
              [levelId]: res,
            }));
          })
          .catch(console.error);
      }
    });
  }, [techSkills, techSkillsLevels]);

  return <SkillsGrid skills={techSkills} skillsLevels={techSkillsLevels} />;
}
