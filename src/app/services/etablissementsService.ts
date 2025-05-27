import { Etablissement } from "@prisma/client";

export async function getEtablissementById(id: number): Promise<Etablissement> {
  try {
    const response = await fetch(`/api/etablissements/${id}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching etablissement :", error);
    return Promise.reject(error);
  }
}
