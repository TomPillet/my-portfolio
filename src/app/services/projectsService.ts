import { Project } from "@prisma/client";

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch("/api/projects", { method: "GET" });
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects :", error);
    return Promise.reject(error);
  }
}
