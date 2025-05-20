export async function getProjects() {
  try {
    const response = await fetch("/api/projects", { method: "GET" });
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects :", error);
    return Promise.reject(error);
  }
}
