"use client";

import ProjetCard from "@/components/layout/ProjetCard";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { Project } from "@prisma/client";
import { getProjects } from "../services/projectsService";
import React, { useEffect, useState } from "react";

export default function Projets() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects()
      .then((res: Project[]) => setProjects(res))
      .catch(console.error);
  }, []);

  return (
    <Container maxW={"7xl"} pt="120px">
      <Heading
        as="h1"
        fontSize={"6xl"}
        textAlign={"center"}
        h="fit"
        lineHeight={2}
        mb={8}
      >
        J{"'"}ai travaillé sur ces projets
      </Heading>
      <Flex gap={4} flexWrap={"wrap"} justifyContent={"center"}>
        {projects.map((project, index) => {
          return <ProjetCard key={index} project={project} />;
        })}
      </Flex>
    </Container>
  );
}
