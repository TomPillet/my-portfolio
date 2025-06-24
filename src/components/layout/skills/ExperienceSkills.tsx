"use client";

import React, { useEffect, useState } from "react";
import { Skill } from "@prisma/client";
import { Flex } from "@chakra-ui/react";
import { getSkillsBySlugs } from "@/app/actions/skillData";
import Link from "next/link";

interface Props {
  skillsSlugs: string[];
}

export default function ExperienceSkills({ skillsSlugs }: Props) {
  const [skills, setSkills] = useState<Skill[]>([]);
  useEffect(() => {
    getSkillsBySlugs(skillsSlugs).then((res) => {
      setSkills(res);
    });
  }, [skillsSlugs]);

  return (
    <Flex flex-wrap={"wrap"} gapX={1} fontStyle={"italic"} flexWrap={"wrap"}>
      {skills.map((skill, index) => (
        <Link key={skill.id} href={`/competences/${skill.slug}`}>
          {index !== 0 && "- "}
          {skill.title}
        </Link>
      ))}
    </Flex>
  );
}
