"use server";
import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";

export async function getProjectsBySkills(skillsIds: number[]) {
  try {
    const projectsOnSkills = await prisma.projectsOnSkills.findMany({
      where: {
        skillId: {
          in: skillsIds,
        },
      },
      include: {
        project: true,
      },
    });

    const groupedBySkill = projectsOnSkills.reduce(
      (groups: Record<number, Project[]>, project) => {
        if (!groups[project.skillId]) {
          groups[project.skillId] = [];
        }
        groups[project.skillId].push(project.project);
        return groups;
      },
      {}
    );

    return groupedBySkill;
  } catch (error) {
    console.error("Error fetching projects data on skills:", error);
    throw new Error("Failed to fetch projects data on skills");
  }
}
