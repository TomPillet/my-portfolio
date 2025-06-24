"use server";
import prisma from "@/lib/prisma";
import { Skill, SkillLevel } from "@prisma/client";

export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  try {
    const skillData = await prisma.skill.findFirst({
      where: {
        slug: slug,
      },
    });
    console.log(skillData);
    return skillData;
  } catch (error) {
    console.error("Error fetching skill data:", error);
    throw new Error("Failed to fetch skill data");
  }
}

export async function getSkillsBySlugs(slugs: string[]): Promise<Skill[]> {
  try {
    const skillData = await prisma.skill.findMany({
      where: {
        slug: {
          in: slugs,
        },
      },
    });
    return skillData;
  } catch (error) {
    console.error("Error fetching skills data:", error);
    throw new Error("Failed to fetch skills data");
  }
}

export async function getSkillLevel(id: number): Promise<SkillLevel | null> {
  try {
    const skillLevel = await prisma.skillLevel.findFirst({
      where: {
        id: id,
      },
    });
    return skillLevel;
  } catch (error) {
    console.error("Error fetching skill levels:", error);
    throw new Error("Failed to fetch skill levels");
  }
}
