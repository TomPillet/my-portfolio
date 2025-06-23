"use server";
import prisma from "@/lib/prisma";
import { Skill } from "@prisma/client";

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
