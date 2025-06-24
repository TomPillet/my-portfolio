"use client";

import React, { useEffect, useState } from "react";
import { Skill } from "@prisma/client";
import { Flex, Span } from "@chakra-ui/react";
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
    <Flex
      flex-wrap={"wrap"}
      gapX={1}
      fontSize={"sm"}
      fontStyle={"italic"}
      flexWrap={"wrap"}
    >
      {skills.length === 0
        ? "Chargement en cours..."
        : skills.map((skill, index) => (
            <Span key={skill.id}>
              {index !== 0 && "- "}
              <Link href={`/competences/${skill.slug}`}>
                <Span
                  color={"light.dirty"}
                  _hover={{
                    textDecoration: "underline",
                    color: "light.default",
                  }}
                >
                  {skill.title}
                </Span>
              </Link>
            </Span>
          ))}
    </Flex>
  );
}
