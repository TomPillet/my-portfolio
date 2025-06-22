import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoriesIdsParam = searchParams.get("categoriesIds");
  let categoriesIds: number[] = [];

  if (categoriesIdsParam) {
    categoriesIds = categoriesIdsParam.split(",").map((id) => parseInt(id));
  }
  const filters: Prisma.SkillWhereInput = {};

  try {
    if (categoriesIds && categoriesIds.length > 0) {
      console.log("categoriesIds", categoriesIds);
      filters.categories = {
        some: {
          categoryId: { in: categoriesIds },
        },
      };
    }

    const skills = await prisma.skill.findMany({
      where: filters,
    });
    return new Response(JSON.stringify(skills), { status: 200 });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return new Response("Failed to fetch skills", { status: 500 });
  }
}
