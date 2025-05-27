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
