"use server";
import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projectData = await prisma.project.findFirst({
      where: {
        slug: slug,
      },
    });
    return projectData;
  } catch (error) {
    console.error("Error fetching skill data:", error);
    throw new Error("Failed to fetch skill data");
  }
}
