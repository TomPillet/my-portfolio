import { z } from "zod";
import { PrismaClient, Prisma, SkillType, Project } from "@prisma/client";
import projects from "./projects.json";
import levels from "./levels.json";
import skills from "./skills.json";

const prisma = new PrismaClient();
const skillTypeSchema = z.nativeEnum(SkillType);

async function main() {
  const createdProjects: Project[] = [];
  for (const project of projects) {
    const createdProject = await prisma.project.create({
      data: {
        slug: project.slug,
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl,
        gitLink: project.gitLink,
        date: project.date.length > 0 ? new Date(project.date) : new Date(),
      },
    });
    createdProjects.push(createdProject);
  }

  const createdLevels = [];
  for (const level of levels) {
    const created = await prisma.skillLevel.create({ data: level });
    createdLevels.push(created);
  }

  const levelIdBySlug = Object.fromEntries(
    createdLevels.map((level) => [level.slug, level.id])
  );
  const projectIdBySlug = (slug: String): number | undefined => {
    return createdProjects.find((project: Project) => project.slug === slug)
      ?.id;
  };

  for (const skill of skills) {
    const createdSkill = await prisma.skill.create({
      data: {
        slug: skill.slug,
        title: skill.title,
        logoUrl: skill.logoUrl,
        type: skillTypeSchema.parse(skill.type),
        level: { connect: { id: levelIdBySlug[skill.level] } },
      },
    });

    for (const projectSlug of skill.projects) {
      await prisma.skillsOnProjects.create({
        data: {
          skill: { connect: { id: createdSkill.id } },
          project: { connect: { id: projectIdBySlug(projectSlug) } },
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
