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
  });

  return (
    <Flex flex-wrap={"wrap"} gap={2} fontStyle={"italic"}>
      {skills.map((skill) => (
        <Link key={skill.id} href={`/competences/${skill.slug}`}>
          {skill.title}
        </Link>
      ))}
    </Flex>
  );
}
