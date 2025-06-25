import { Flex, Heading, Container, Text, Highlight } from "@chakra-ui/react";
import { getSkillBySlug, getSkillLevel } from "@/app/actions/skillData";
import { Skill, SkillLevel } from "@prisma/client";

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
                Ce que j'en pense
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
          </Flex>
        )}
      </Flex>
    </Container>
  );
}
