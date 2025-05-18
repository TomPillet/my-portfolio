export async function getSkillLevelById(id: number) {
  try {
    const response = await fetch(`/api/skill-level/${id}`, { method: "GET" });
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return Promise.reject(error);
  }
}
