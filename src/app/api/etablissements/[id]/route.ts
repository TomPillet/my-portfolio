import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let result;
    result = await prisma.etablissement.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error fetching etablissement:", error);
    return new Response("Failed to fetch etablissement", { status: 500 });
  }
}
