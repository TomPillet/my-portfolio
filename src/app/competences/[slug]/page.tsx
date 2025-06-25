import { Flex, Heading, Container, Text, Highlight } from "@chakra-ui/react";
import { getSkillBySlug, getSkillLevel } from "@/app/actions/skillData";
import { Project, Skill, SkillLevel } from "@prisma/client";
import { getProjectsBySkill } from "@/app/actions/projectsOnSkills";
import Link from "next/link";

interface CompetenceDetailsProps {
  params: Promise<{
    slug: string;
  }>;
}

type CompetenceDetailsTexts = {
  myDefinition: string;
  myExperience: string;
  myThought: string;
  myJourney: string;
};

export default async function CompetenceDetails({
  params,
}: CompetenceDetailsProps) {
  const { slug } = await params;
  const skillData: Skill | null = await getSkillBySlug(slug).then((res) => res);
  const skillLevel: SkillLevel | null = await getSkillLevel(
    skillData?.levelId ?? 0
  );
  const projects: Project[] = await getProjectsBySkill(skillData?.id ?? 0).then(
    (res) => res
  );

  return (
    <Container maxW={"4xl"}>
      <Flex
        py={{ lg: "120px", base: "100px" }}
        minH={"100dvh"}
        w="full"
        flexDir={"column"}
        gap={8}
      >
        <Flex flexDir={"column"} alignItems={"center"} gap={4}>
          <Heading as="h1" textAlign={"center"} variant={"mainTitle"}>
            {skillData && skillData.title}
          </Heading>
          {skillLevel && (
            <Highlight
              query={skillLevel.label}
              styles={{
                px: "2",
                bg: "skills." + skillLevel.slug,
                color: "dark.default",
                fontSize: { lg: "xl", base: "sm" },
                fontWeight: "bold",
                rounded: "md",
                w: "fit",
              }}
            >
              {skillLevel.label}
            </Highlight>
          )}
        </Flex>
        {skillData && (
          <Flex flexDir={"column"} gap={8}>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Ma définition
              </Heading>
              <Text
                textAlign={"justify"}
                textIndent={"2em each-line"}
                whiteSpace={"pre-line"}
              >
                {(skillData.details as CompetenceDetailsTexts).myDefinition}
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Mon expérience
              </Heading>
              <Text
                textAlign={"justify"}
                textIndent={"2em each-line"}
                whiteSpace={"pre-line"}
              >
                {(skillData.details as CompetenceDetailsTexts).myExperience}
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Ce que j{"'"}en pense
              </Heading>
              <Text
                textAlign={"justify"}
                textIndent={"2em each-line"}
                whiteSpace={"pre-line"}
              >
                {(skillData.details as CompetenceDetailsTexts).myThought}
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Insertion dans mon parcours
              </Heading>
              <Text
                textAlign={"justify"}
                textIndent={"2em each-line"}
                whiteSpace={"pre-line"}
              >
                {(skillData.details as CompetenceDetailsTexts).myJourney}
              </Text>
            </Flex>
            <Flex
              flexDir={"column"}
              gap={4}
              id="skills-attached"
              alignItems={"center"}
            >
              {/* TODO: Add button to slide directly here */}
              <Heading as="h3" variant={"secondTitle"}>
                Projets rattachés
              </Heading>
              <Flex flexDir={"row"} flexWrap={"wrap"} gap={4}>
                {projects.map((project) => (
                  <Link key={project.id} href={`/projets/${project.slug}`}>
                    <Highlight
                      query={project.title}
                      styles={{
                        px: "2",
                        py: "1",
                        rounded: "xl",
                        bg: "light.default",
                        color: "dark.default",
                        fontSize: { lg: "xl", base: "sm" },
                        fontWeight: "bold",
                      }}
                    >
                      {project.title}
                    </Highlight>
                  </Link>
                ))}
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Container>
  );
}
