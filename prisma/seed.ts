import { z } from "zod";
import {
  PrismaClient,
  SkillType,
  Project,
  ProjectType,
  Skill,
} from "@prisma/client";
import entreprises from "./entreprises.json";
import projects from "./projects.json";
import levels from "./levels.json";
import skills from "./skills.json";

const prisma = new PrismaClient();
const projectTypeSchema = z.nativeEnum(ProjectType);
const skillTypeSchema = z.nativeEnum(SkillType);

async function createEntreprisesModel() {
  const createdEntreprises = [];
  const existingEntreprises = await prisma.entreprise.findMany();
  const existingEntreprisesSlugs = existingEntreprises.map(
    (entreprise) => entreprise.slug
  );

  for (const entreprise of entreprises) {
    if (existingEntreprisesSlugs.includes(entreprise.slug)) {
      console.log(`Entreprise with slug ${entreprise.slug} already exists`);
      continue;
    }
    const created = await prisma.entreprise.create({ data: entreprise });
    createdEntreprises.push(created);
  }

  return createdEntreprises;
}

async function createLevelsModel() {
  const createdLevels = [];
  const existingLevels = await prisma.skillLevel.findMany();
  const existingLevelsSlugs = existingLevels.map((level) => level.slug);

  for (const level of levels) {
    if (existingLevelsSlugs.includes(level.slug)) {
      console.log(`Level with slug ${level.slug} already exists`);
      continue;
    }
    const created = await prisma.skillLevel.create({ data: level });
    createdLevels.push(created);
  }

  return createdLevels;
}

async function createProjectsModel(entrepriseIdBySlug: any) {
  const createdProjects: Project[] = [];
  const existingProjects = await prisma.project.findMany();
  const existingProjectsSlugs = existingProjects.map((project) => project.slug);

  for (const project of projects) {
    if (existingProjectsSlugs.includes(project.slug)) {
      console.log(`Project with slug ${project.slug} already exists`);
      continue;
    }

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
  const existingSkills = await prisma.skill.findMany();
  const existingSkillsSlugs = existingSkills.map((skill) => skill.slug);

  for (const skill of skills) {
    let createdSkill: Skill;
    if (existingSkillsSlugs.includes(skill.slug)) {
      console.log(`Skill with slug ${skill.slug} already exists`);
      createdSkill = existingSkills.find((s) => s.slug === skill.slug)!;
    } else {
      createdSkill = await prisma.skill.create({
        data: {
          slug: skill.slug,
          title: skill.title,
          logoUrl: skill.logoUrl,
          type: skillTypeSchema.parse(skill.type),
          level: { connect: { id: levelIdBySlug[skill.level] } },
        },
      });
    }

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
