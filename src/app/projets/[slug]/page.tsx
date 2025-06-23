import { Flex, Heading, Container, Text, Highlight } from "@chakra-ui/react";
import { getProjectBySlug } from "@/app/actions/projectData";
import { Project } from "@prisma/client";

interface CompetenceDetailsProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CompetenceDetails({
  params,
}: CompetenceDetailsProps) {
  const { slug } = await params;
  const projectData: Project | null = await getProjectBySlug(slug).then(
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
            {slug}
          </Heading>
        </Flex>
        {projectData && (
          <Flex flexDir={"column"} gap={8}>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                C'est quoi ?
              </Heading>
              <Text textAlign={"center"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Le contexte
              </Heading>
              <Text textAlign={"center"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Les acteurs
              </Heading>
              <Text textAlign={"center"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Les étapes
              </Heading>
              <Text textAlign={"center"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Les résultats
              </Heading>
              <Text textAlign={"center"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2}>
              <Heading as="h2" variant={"secondTitle"}>
                Et la suite ?
              </Heading>
              <Text textAlign={"center"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </Flex>
            <Flex flexDir={"column"} gap={2} id="skills-attached">
              {/* TODO: Add button to slide directly here */}
              <Heading as="h3" variant={"secondTitle"}>
                Compétences rattachées
              </Heading>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Container>
  );
}
