import { z } from "zod";
import {
  Category,
  Etablissement,
  EtablissementType,
  PrismaClient,
  Project,
  ProjectType,
  Skill,
  SkillLevel,
} from "@prisma/client";
import etablissements from "./etablissements.json";
import categories from "./categories.json";
import projects from "./projects.json";
import levels from "./levels.json";
import techSkills from "./techSkills.json";
import softSkills from "./softSkills.json";

const prisma = new PrismaClient();
const projectTypeSchema = z.nativeEnum(ProjectType);
const etablissementTypeSchema = z.nativeEnum(EtablissementType);

async function createCategoriesOnSkillRecords(
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

async function createSkillsOnProjectRecords(
  skillsSlugs: string[],
  skillIdBySlug: any,
  projectId: number
) {
  for (const skillSlug of skillsSlugs) {
    const skillId = skillIdBySlug[skillSlug];
    if (skillId === undefined) continue;
    await prisma.projectsOnSkills.upsert({
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
      title: category.title,
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

async function createEtablissementsModel(): Promise<Etablissement[]> {
  const createdEtablissements = [];
  const existingEtablissements = await prisma.etablissement.findMany();
  const existingEtablissementsSlugs = existingEtablissements.map(
    (etablissement: any) => etablissement.slug
  );

  for (const etablissement of etablissements) {
    const data = {
      slug: etablissement.slug,
      name: etablissement.name,
      siteUrl: etablissement.siteUrl,
      type: etablissementTypeSchema.parse(etablissement.type),
    };

    let createdEtablissement: Etablissement;
    if (existingEtablissementsSlugs.includes(etablissement.slug)) {
      createdEtablissement = await prisma.etablissement.update({
        where: { slug: etablissement.slug },
        data: data,
      });
    } else {
      createdEtablissement = await prisma.etablissement.create({
        data: data,
      });
    }
    createdEtablissements.push(createdEtablissement);
  }
  return createdEtablissements;
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

async function createSkillsModel(
  levelIdBySlug: any,
  categoryIdBySlug: any
): Promise<Skill[]> {
  const existingSkills = await prisma.skill.findMany();
  const existingSkillsSlugs = existingSkills.map((skill) => skill.slug);
  const createdSkills: Skill[] = [];
  const skills = [...techSkills, ...softSkills];

  for (const skill of skills) {
    const data = {
      slug: skill.slug,
      title: skill.title,
      logoUrl: skill.logoUrl,
      details: skill.details,
      level:
        skill.level.length > 0
          ? { connect: { id: levelIdBySlug[skill.level] } }
          : {},
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

    createCategoriesOnSkillRecords(
      skill.categories,
      categoryIdBySlug,
      createdSkill.id
    );
    createdSkills.push(createdSkill);
  }
  return createdSkills;
}

async function createProjectsModel(
  etablissementIdBySlug: any,
  skillIdBySlug: any
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
      isActive: project.isActive,
      type: projectTypeSchema.parse(project.type),
      etablissement: {},
    };

    if (project.etablissement.length > 0) {
      data.etablissement = {
        connect: { id: etablissementIdBySlug[project.etablissement] },
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

    createSkillsOnProjectRecords(
      project.skills,
      skillIdBySlug,
      createdProject.id
    );
    createdProjects.push(createdProject);
  }
  return createdProjects;
}

function fetchFromSlugToId(model: any[]) {
  return Object.fromEntries(model.map((item) => [item.slug, item.id]));
}

async function main() {
  const createdCategories = await createCategoriesModel();
  const categoryIdBySlug = fetchFromSlugToId(createdCategories);

  const createdEtablissements = await createEtablissementsModel();
  const etablissementIdBySlug = fetchFromSlugToId(createdEtablissements);

  const createdLevels = await createLevelsModel();
  const levelIdBySlug = fetchFromSlugToId(createdLevels);

  const createdSkills = await createSkillsModel(
    levelIdBySlug,
    categoryIdBySlug
  );
  const skillIdBySlug = fetchFromSlugToId(createdSkills);

  createProjectsModel(etablissementIdBySlug, skillIdBySlug);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
