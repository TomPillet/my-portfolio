import { Flex, Heading, Container, Text, Highlight } from "@chakra-ui/react";
import { getProjectBySlug } from "@/app/actions/projectData";
import { Project, Skill } from "@prisma/client";
import { getSkillsByProject } from "@/app/actions/projectsOnSkills";
import Link from "next/link";

interface CompetenceDetailsProps {
  params: Promise<{
    slug: string;
  }>;
}

type ProjectDetailsTexts = {
  presentation: string;
  context: string;
  actors: string;
  work: string;
  results: string;
  following: string;
  analysis: string;
};

export default async function CompetenceDetails({
  params,
}: CompetenceDetailsProps) {
  const { slug } = await params;
  const projectData: Project | null = await getProjectBySlug(slug).then(
    (res) => res
  );
  const skills: Skill[] = await getSkillsByProject(projectData?.id ?? 0).then(
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
            {projectData && projectData.title}
          </Heading>
        </Flex>
        {projectData && (
          <Flex flexDir={"column"} gap={8}>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                C{"'"}est quoi ?
              </Heading>
              <Text
                textAlign={"justify"}
                textIndent={"2em each-line"}
                whiteSpace={"pre-line"}
              >
                {(projectData.description as ProjectDetailsTexts).presentation}
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Le contexte
              </Heading>
              <Text
                textAlign={"justify"}
                textIndent={"2em each-line"}
                whiteSpace={"pre-line"}
              >
                {(projectData.description as ProjectDetailsTexts).context}
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Les acteurs
              </Heading>
              <Text
                textAlign={"justify"}
                textIndent={"2em each-line"}
                whiteSpace={"pre-line"}
              >
                {(projectData.description as ProjectDetailsTexts).actors}
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Les étapes
              </Heading>
              <Text
                textAlign={"justify"}
                textIndent={"2em each-line"}
                whiteSpace={"pre-line"}
              >
                {(projectData.description as ProjectDetailsTexts).work}
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Les résultats
              </Heading>
              <Text
                textAlign={"justify"}
                textIndent={"2em each-line"}
                whiteSpace={"pre-line"}
              >
                {(projectData.description as ProjectDetailsTexts).results}
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Et la suite ?
              </Heading>
              <Text
                textAlign={"justify"}
                textIndent={"2em each-line"}
                whiteSpace={"pre-line"}
              >
                {(projectData.description as ProjectDetailsTexts).following}
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Bilan du projet
              </Heading>
              <Text
                textAlign={"justify"}
                textIndent={"2em each-line"}
                whiteSpace={"pre-line"}
              >
                {(projectData.description as ProjectDetailsTexts).analysis}
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
                Compétences rattachées
              </Heading>
              <Flex
                flexDir={"row"}
                flexWrap={"wrap"}
                gap={4}
                justifyContent={"center"}
              >
                {skills.map((skill) => (
                  <Link key={skill.id} href={`/competences/${skill.slug}`}>
                    <Highlight
                      query={skill.title}
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
                      {skill.title}
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
