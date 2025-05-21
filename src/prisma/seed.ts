import { z } from "zod";
import { PrismaClient, SkillType, Project, ProjectType } from "@prisma/client";
import entreprises from "./entreprises.json";
import projects from "./projects.json";
import levels from "./levels.json";
import skills from "./skills.json";

const prisma = new PrismaClient();
const projectTypeSchema = z.nativeEnum(ProjectType);
const skillTypeSchema = z.nativeEnum(SkillType);

async function createEntreprisesModel() {
  const createdEntreprises = [];
  for (const entreprise of entreprises) {
    const created = await prisma.entreprise.create({ data: entreprise });
    createdEntreprises.push(created);
  }
  return createdEntreprises;
}

async function createLevelsModel() {
  const createdLevels = [];
  for (const level of levels) {
    const created = await prisma.skillLevel.create({ data: level });
    createdLevels.push(created);
  }
  return createdLevels;
}

async function createProjectsModel(entrepriseIdBySlug: any) {
  const createdProjects: Project[] = [];
  for (const project of projects) {
    const data = {
      slug: project.slug,
      title: project.title,
      description: project.description,
      shortDescription: project.shortDescription,
      imageUrl: project.imageUrl,
      gitUrl: project.gitUrl,
      hostUrl: project.hostUrl,
      date: project.date.length > 0 ? new Date(project.date) : new Date(),
      type: projectTypeSchema.parse(project.type),
      entreprise: {},
    };

    if (project.entreprise.length > 0) {
      data.entreprise = {
        connect: { id: entrepriseIdBySlug[project.entreprise] },
      };
    }

    const createdProject = await prisma.project.create({
      data: data,
    });
    createdProjects.push(createdProject);
  }
  return createdProjects;
}

async function createSkillsModel(levelIdBySlug: any, projectIdBySlug: any) {
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
      const projectId = projectIdBySlug[projectSlug];
      if (projectId === undefined) continue;
      await prisma.skillsOnProjects.create({
        data: {
          skill: { connect: { id: createdSkill.id } },
          project: { connect: { id: projectId } },
        },
      });
    }
  }
}

function fetchFromSlugToId(model: any[]) {
  return Object.fromEntries(model.map((item) => [item.slug, item.id]));
}

async function main() {
  const createdEntreprises = await createEntreprisesModel();
  const createdLevels = await createLevelsModel();
  const entrepriseIdBySlug = fetchFromSlugToId(createdEntreprises);
  const levelIdBySlug = fetchFromSlugToId(createdLevels);

  const createdProjects = await createProjectsModel(entrepriseIdBySlug);
  const projectIdBySlug = fetchFromSlugToId(createdProjects);
  createSkillsModel(levelIdBySlug, projectIdBySlug);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
