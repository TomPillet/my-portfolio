import { Skill } from "@prisma/client";
import { getCategories, getCategoriesBySlug } from "./categoriesService";

export async function getTechSkills(): Promise<Skill[]> {
  try {
    const techSkillsIds = await getCategories().then((categories) => {
      return categories
        .filter((category) => category.slug != "softskill")
        .map((category) => category.id);
    });
    console.log("techSkillsIds", techSkillsIds);

    const response = await fetch(`/api/skills?categoriesIds=${techSkillsIds}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching skills :", error);
    return Promise.reject(error);
  }
}

export async function getSoftSkills(): Promise<Skill[]> {
  try {
    const softSkillId = await getCategoriesBySlug("softskill").then(
      (category) => {
        return category.map((category) => category.id);
      }
    );
    console.log("softSkillId", softSkillId);
    const response = await fetch(`/api/skills?categoriesIds=${softSkillId}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching skills :", error);
    return Promise.reject(error);
  }
}
