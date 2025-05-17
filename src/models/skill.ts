import { Projet } from "./projet";

const SkillLevel = {
  JUNIOR: {
    value: "junior",
    label: "Junior",
    color: "#b8e2a1",
  },
  INTERMEDIATE: {
    value: "intermediate",
    label: "Intermédiaire",
    color: "#A3E4D7",
  },
  CONFIRMED: {
    value: "confirmed",
    label: "Confirmé",
    color: "#F5B7B1",
  },
  EXPERT: {
    value: "expert",
    label: "Expert",
    color: "#D7BDE2",
  },
};
export type SkillLevelType = (typeof SkillLevel)[keyof typeof SkillLevel];

enum SkillType {
  FRONT = "frontend",
  BACK = "backend",
  CMS = "cms",
  TESTING = "testing",
  DEVOPS = "devops",
  DESIGN = "design",
  INFRASTRUCTURE = "infrastructure",
}

export interface Skill {
  title: string;
  slug: string;
  type: SkillType;
  level: SkillLevelType;
  projets: Projet[];
  logo: string;
}

// TODO : exports from API
export const skills: Skill[] = [
  {
    title: "Typescript",
    slug: "typescript",
    type: SkillType.FRONT,
    level: SkillLevel.EXPERT,
    projets: [
      {
        title: "Nest",
        slug: "nest",
        description: "",
        image: "",
        link: "",
      },
      {
        title: "Cadcom",
        slug: "cadcom",
        description: "",
        image: "",
        link: "",
      },
      {
        title: "The Hive",
        slug: "the-hive",
        description: "",
        image: "",
        link: "",
      },
      {
        title: "Profusion",
        slug: "profusion",
        description: "",
        image: "",
        link: "",
      },
    ],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg",
  },
  {
    title: "PHP",
    slug: "php",
    type: SkillType.FRONT,
    level: SkillLevel.INTERMEDIATE,
    projets: [],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-plain.svg",
  },
  {
    title: "Java",
    slug: "java",
    type: SkillType.FRONT,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-plain.svg",
  },
  {
    title: "SQL",
    slug: "sql",
    type: SkillType.FRONT,
    level: SkillLevel.CONFIRMED,
    projets: [],
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
  },
  {
    title: "Angular",
    slug: "angular",
    type: SkillType.FRONT,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "Vue",
    slug: "vue",
    type: SkillType.FRONT,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "React",
    slug: "react",
    type: SkillType.FRONT,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "React Native",
    slug: "react-native",
    type: SkillType.FRONT,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "NextJS",
    slug: "nextjs",
    type: SkillType.FRONT,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "Tailwind",
    slug: "tailwind",
    type: SkillType.FRONT,
    level: SkillLevel.INTERMEDIATE,
    projets: [],
    logo: "",
  },
  {
    title: "Nest",
    slug: "nest",
    type: SkillType.BACK,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "Laravel",
    slug: "laravel",
    type: SkillType.BACK,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "Sylius",
    slug: "sylius",
    type: SkillType.BACK,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "MySQL",
    slug: "mysql",
    type: SkillType.BACK,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "Spring Boot",
    slug: "spring-boot",
    type: SkillType.BACK,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "JUnit",
    slug: "junit",
    type: SkillType.TESTING,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "Git",
    slug: "git",
    type: SkillType.DEVOPS,
    level: SkillLevel.INTERMEDIATE,
    projets: [],
    logo: "",
  },
  {
    title: "Jenkins",
    slug: "jenkins",
    type: SkillType.DEVOPS,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "Docker",
    slug: "docker",
    type: SkillType.DEVOPS,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "Kubernetes",
    slug: "kubernetes",
    type: SkillType.DEVOPS,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "CapRover",
    slug: "caprover",
    type: SkillType.INFRASTRUCTURE,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "Postman",
    slug: "postman",
    type: SkillType.DEVOPS,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "WSL2",
    slug: "wsl2",
    type: SkillType.DEVOPS,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "Figma",
    slug: "figma",
    type: SkillType.DESIGN,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
  {
    title: "Wordpress",
    slug: "wordpress",
    type: SkillType.CMS,
    level: SkillLevel.JUNIOR,
    projets: [],
    logo: "",
  },
];
