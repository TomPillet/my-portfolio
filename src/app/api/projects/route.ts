import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new Response("Failed to fetch projects", { status: 500 });
  }
}
