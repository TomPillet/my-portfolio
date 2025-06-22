import { Category } from "@prisma/client";

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch("/api/categories", { method: "GET" });
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories :", error);
    return Promise.reject(error);
  }
}

export async function getCategoriesBySlug(slug: string): Promise<Category[]> {
  try {
    const response = await fetch(`/api/categories?slug=${slug}`, {
      method: "GET",
    });
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories :", error);
    return Promise.reject(error);
  }
}
