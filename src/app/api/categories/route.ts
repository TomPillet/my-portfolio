import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    const filters: Prisma.CategoryWhereInput = {};
    if (slug) filters.slug = slug;

    const categories = await prisma.category.findMany({
      where: filters,
    });

    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response("Failed to fetch categories", { status: 500 });
  }
}
