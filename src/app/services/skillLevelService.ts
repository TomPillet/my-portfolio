export async function getSkillLevelById(id: number) {
  try {
    const response = await fetch(`/api/skill-level/${id}`, { method: "GET" });
    return await response.json();
  } catch (error) {
    console.error("Error fetching skill level :", error);
    return Promise.reject(error);
  }
}
