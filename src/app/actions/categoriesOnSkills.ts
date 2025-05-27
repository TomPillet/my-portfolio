"use server";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";

export async function getCategoriesBySkills(skillsIds: number[]) {
  try {
    const categoriesOnSkills = await prisma.categoriesOnSkills.findMany({
      where: {
        skillId: {
          in: skillsIds,
        },
      },
      include: {
        category: true,
      },
    });

    const groupedBySkill = categoriesOnSkills.reduce(
      (groups: Record<number, Category[]>, category) => {
        if (!groups[category.skillId]) {
          groups[category.skillId] = [];
        }
        groups[category.skillId].push(category.category);
        return groups;
      },
      {}
    );

    return groupedBySkill;
  } catch (error) {
    console.error("Error fetching categories data on skills:", error);
    throw new Error("Failed to fetch categories data on skills");
  }
}
