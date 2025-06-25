"use server";
import prisma from "@/lib/prisma";
import { Project, Skill } from "@prisma/client";

export async function getProjectsBySkills(
  skillsIds: number[]
): Promise<Record<number, Project[]>> {
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

export async function getProjectsBySkill(skillId: number): Promise<Project[]> {
  try {
    const projectSkills = await prisma.projectsOnSkills
      .findMany({
        where: {
          skillId: skillId,
        },
        include: {
          project: true,
        },
      })
      .then((projects) => projects.map((item) => item.project));
    return projectSkills;
  } catch (error) {
    console.error("Error fetching projects data on skill:", error);
    throw new Error("Failed to fetch projects data on skill");
  }
}

export async function getSkillsByProject(projectId: number): Promise<Skill[]> {
  try {
    const projectSkills = await prisma.projectsOnSkills
      .findMany({
        where: {
          projectId: projectId,
        },
        include: {
          skill: true,
        },
      })
      .then((skills) => skills.map((item) => item.skill));
    return projectSkills;
  } catch (error) {
    console.error("Error fetching skills data on project:", error);
    throw new Error("Failed to fetch skills data on project");
  }
}
