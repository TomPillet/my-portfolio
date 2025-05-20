export async function getSkills() {
  try {
    const response = await fetch("/api/skills", { method: "GET" });
    return await response.json();
  } catch (error) {
    console.error("Error fetching skills :", error);
    return Promise.reject(error);
  }
}
