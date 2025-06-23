import { Flex, Heading, Container, Box } from "@chakra-ui/react";
import Image from "next/image";
import { getSkillBySlug } from "@/app/actions/skillData";
import { Skill } from "@prisma/client";

interface CompetenceDetailsProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CompetenceDetails({
  params,
}: CompetenceDetailsProps) {
  const { slug } = await params;
  const skillData: Skill | null = await getSkillBySlug(slug).then((res) => res);

  return (
    <Container maxW={"7xl"}>
      <Flex
        py={{ lg: "120px", base: "100px" }}
        minH={"100dvh"}
        w="full"
        flexDir={"column"}
      >
        <Heading
          as="h1"
          textAlign={"center"}
          mb={{ lg: 12, base: 8 }}
          variant={"mainTitle"}
        >
          {slug}
        </Heading>
        {skillData && (
          <Box opacity={0.6} h={"400px"} w={"400px"} m={"auto"}>
            <Image
              src={skillData?.logoUrl}
              alt={slug}
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
        )}
      </Flex>
    </Container>
  );
}
