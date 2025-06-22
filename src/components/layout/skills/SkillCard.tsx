"use client";
import TiltedCard from "@/reactbits/components/TiltedCard/TiltedCard";
import React from "react";
import { SkillComponent } from "./SkillComponent";
import { Category, Project, Skill, SkillLevel } from "@prisma/client";
import { useBreakpointValue } from "@chakra-ui/react";

interface SkillCardSizes {
  [key: string]: {
    height: string;
    width: string;
  };
}

const skillCardSizes: SkillCardSizes = {
  base: {
    height: "160px",
    width: "140px",
  },
  mobile: {
    height: "210px",
    width: "190px",
  },
  desktop: {
    height: "260px",
    width: "240px",
  },
};

interface SkillCardProps {
  skill: Skill;
  skillLevel: SkillLevel;
  categories: Category[];
  projects: Project[];
}

export default function SkillCard({
  skill,
  skillLevel,
  categories,
  projects,
}: SkillCardProps) {
  const breakpoint: string =
    useBreakpointValue({
      base: "base",
      sm: "mobile",
      lg: "desktop",
    }) ?? "base";

  return (
    <TiltedCard
      imageSrc={"https://cataas.com/cat"}
      altText={skill?.slug}
      imageHeight={skillCardSizes[breakpoint].height}
      imageWidth={skillCardSizes[breakpoint].width}
      containerHeight={skillCardSizes[breakpoint].height}
      containerWidth={skillCardSizes[breakpoint].width}
      rotateAmplitude={12}
      scaleOnHover={1.2}
      showMobileWarning={false}
      showTooltip={true}
      displayOverlayContent={true}
      overlayContent={
        <SkillComponent
          width={skillCardSizes[breakpoint].width}
          height={skillCardSizes[breakpoint].height}
          skill={skill}
          skillLevel={skillLevel}
          categories={categories}
          projets={projects}
        />
      }
    ></TiltedCard>
  );
}
