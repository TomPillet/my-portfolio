import { z } from "zod";
import {
  Category,
  Entreprise,
  PrismaClient,
  Project,
  ProjectType,
  Skill,
  SkillLevel,
} from "@prisma/client";
import entreprises from "./entreprises.json";
import categories from "./categories.json";
import projects from "./projects.json";
import levels from "./levels.json";
import skills from "./skills.json";
import { create } from "domain";

const prisma = new PrismaClient();
const projectTypeSchema = z.nativeEnum(ProjectType);

async function createCategoriesOnSkillsRecords(
  categoriesSlugs: string[],
  categoryIdBySlug: any,
  skillId: number
) {
  for (const categorySlug of categoriesSlugs) {
    const categoryId = categoryIdBySlug[categorySlug];
    if (categoryId === undefined) continue;
    await prisma.categoriesOnSkills.upsert({
      where: {
        categoryId_skillId: { categoryId: categoryId, skillId: skillId },
      },
      update: {},
      create: {
        category: { connect: { id: categoryId } },
        skill: { connect: { id: skillId } },
      },
    });
  }
}

async function createSkillsOnProjectsRecords(
  projectsSlugs: string[],
  projectIdBySlug: any,
  skillId: number
) {
  for (const projectSlug of projectsSlugs) {
    const projectId = projectIdBySlug[projectSlug];
    if (projectId === undefined) continue;
    await prisma.skillsOnProjects.upsert({
      where: {
        projectId_skillId: { projectId: projectId, skillId: skillId },
      },
      update: {},
      create: {
        project: { connect: { id: projectId } },
        skill: { connect: { id: skillId } },
      },
    });
  }
}

async function createCategoriesModel(): Promise<Category[]> {
  const createdCategories = [];
  const existingCategories = await prisma.category.findMany();
  const existingCategoriesSlugs = existingCategories.map(
    (category) => category.slug
  );

  for (const category of categories) {
    const data = {
      slug: category.slug,
      shortDescription: category.shortDescription,
    };

    let createdCategory: Category;
    if (existingCategoriesSlugs.includes(category.slug)) {
      createdCategory = await prisma.category.update({
        where: { slug: category.slug },
        data: data,
      });
    } else {
      createdCategory = await prisma.category.create({
        data: data,
      });
    }
    createdCategories.push(createdCategory);
  }

  return createdCategories;
}

async function createEntreprisesModel(): Promise<Entreprise[]> {
  const createdEntreprises = [];
  const existingEntreprises = await prisma.entreprise.findMany();
  const existingEntreprisesSlugs = existingEntreprises.map(
    (entreprise) => entreprise.slug
  );

  for (const entreprise of entreprises) {
    const data = {
      slug: entreprise.slug,
      name: entreprise.name,
      siteUrl: entreprise.siteUrl,
    };

    let createdEntreprise: Entreprise;
    if (existingEntreprisesSlugs.includes(entreprise.slug)) {
      createdEntreprise = await prisma.entreprise.update({
        where: { slug: entreprise.slug },
        data: data,
      });
    } else {
      createdEntreprise = await prisma.entreprise.create({
        data: data,
      });
    }
    createdEntreprises.push(createdEntreprise);
  }

  return createdEntreprises;
}

async function createLevelsModel(): Promise<SkillLevel[]> {
  const createdLevels = [];
  const existingLevels = await prisma.skillLevel.findMany();
  const existingLevelsSlugs = existingLevels.map((level) => level.slug);

  for (const level of levels) {
    const data = {
      slug: level.slug,
      label: level.label,
    };

    let createdLevel: SkillLevel;
    if (existingLevelsSlugs.includes(level.slug)) {
      createdLevel = await prisma.skillLevel.update({
        where: { slug: level.slug },
        data: data,
      });
    } else {
      createdLevel = await prisma.skillLevel.create({ data: data });
    }
    createdLevels.push(createdLevel);
  }

  return createdLevels;
}

async function createProjectsModel(
  entrepriseIdBySlug: any
): Promise<Project[]> {
  const createdProjects: Project[] = [];
  const existingProjects = await prisma.project.findMany();
  const existingProjectsSlugs = existingProjects.map((project) => project.slug);

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

    let createdProject: Project;
    if (existingProjectsSlugs.includes(project.slug)) {
      createdProject = await prisma.project.update({
        where: { slug: project.slug },
        data: data,
      });
    } else {
      createdProject = await prisma.project.create({
        data: data,
      });
    }
    createdProjects.push(createdProject);
  }

  return createdProjects;
}

async function createSkillsModel(
  levelIdBySlug: any,
  projectIdBySlug: any,
  categoryIdBySlug: any
) {
  const existingSkills = await prisma.skill.findMany();
  const existingSkillsSlugs = existingSkills.map((skill) => skill.slug);

  for (const skill of skills) {
    const data = {
      slug: skill.slug,
      title: skill.title,
      logoUrl: skill.logoUrl,
      level: { connect: { id: levelIdBySlug[skill.level] } },
    };
    let createdSkill: Skill;

    if (existingSkillsSlugs.includes(skill.slug)) {
      createdSkill = await prisma.skill.update({
        where: { slug: skill.slug },
        data: data,
      });
    } else {
      createdSkill = await prisma.skill.create({
        data: data,
      });
    }

    createSkillsOnProjectsRecords(
      skill.projects,
      projectIdBySlug,
      createdSkill.id
    );
    createCategoriesOnSkillsRecords(
      skill.categories,
      categoryIdBySlug,
      createdSkill.id
    );
  }
}

function fetchFromSlugToId(model: any[]) {
  return Object.fromEntries(model.map((item) => [item.slug, item.id]));
}

async function main() {
  const createdCategories = await createCategoriesModel();
  const createdEntreprises = await createEntreprisesModel();
  const createdLevels = await createLevelsModel();
  const categoryIdBySlug = fetchFromSlugToId(createdCategories);
  const entrepriseIdBySlug = fetchFromSlugToId(createdEntreprises);
  const levelIdBySlug = fetchFromSlugToId(createdLevels);

  const createdProjects = await createProjectsModel(entrepriseIdBySlug);
  const projectIdBySlug = fetchFromSlugToId(createdProjects);
  createSkillsModel(levelIdBySlug, projectIdBySlug, categoryIdBySlug);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
