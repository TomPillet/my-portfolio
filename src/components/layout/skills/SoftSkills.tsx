"use client";
import { Skill, SkillLevel } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { getSkillLevelById } from "@/app/services/skillLevelService";
import { getSoftSkills } from "@/app/services/skillsService";
import SkillsGrid from "./SkillsGrid";

export default function SoftSkills() {
  const [softSkills, setSoftSkills] = useState<Skill[]>([]);
  const [softSkillsLevels, setSoftSkillsLevels] = useState<
    Record<number, SkillLevel>
  >({});

  useEffect(() => {
    getSoftSkills()
      .then((res: Skill[]) => setSoftSkills(res))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const levelIds = [...new Set(softSkills.map((skill) => skill.levelId))];
    levelIds.forEach((levelId) => {
      if (levelId != null && !softSkillsLevels[levelId]) {
        getSkillLevelById(levelId)
          .then((res) => {
            setSoftSkillsLevels((prev) => ({
              ...prev,
              [levelId]: res,
            }));
          })
          .catch(console.error);
      }
    });
  }, [softSkills, softSkillsLevels]);

  return <SkillsGrid skills={softSkills} skillsLevels={softSkillsLevels} />;
}
