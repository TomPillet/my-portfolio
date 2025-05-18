import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level");
  const type = searchParams.get("type");

  const filters: { [key: string]: string } = {};
  if (level) filters.level = level;
  if (type) filters.type = type;

  try {
    const skills = await prisma.skill.findMany({
      where: filters,
    });
    return new Response(JSON.stringify(skills), { status: 200 });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return new Response("Failed to fetch skills", { status: 500 });
  }
}
