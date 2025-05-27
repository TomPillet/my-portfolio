import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let result;
    result = await prisma.skillLevel.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error fetching skill levels:", error);
    return new Response("Failed to fetch skill levels", { status: 500 });
  }
}
