"use client";

import ProjetCard from "@/components/layout/ProjetCard";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { Project } from "@prisma/client";
import { getProjects } from "../services/projectsService";
import React, { useEffect, useState } from "react";
import RotatingText from "@/reactbits/text-animations/RotatingText/RotatingText";

export default function Projets() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects()
      .then((res: Project[]) => setProjects(res))
      .catch(console.error);
  }, []);

  return (
    <Container maxW={"7xl"} pt="120px">
      <Flex
        fontSize={"6xl"}
        fontWeight={"700"}
        textTransform={"uppercase"}
        lineHeight={2}
        color={"#fcf8e8"}
        mb={8}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading
          as="h1"
          h="fit"
          w={"1/3"}
          lineHeight={2}
          fontSize={"6xl"}
          fontWeight={"700"}
          pb={1}
        >
          Mes projets
        </Heading>
        <Box
          transition={"all 0.3s ease-in-out"}
          bg="#163a2c"
          px={4}
          rounded={"2xl"}
          lineHeight={1.6}
        >
          <RotatingText
            texts={["Professionnels", "Personnels", "Universitaires"]}
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden "
            transition={{ type: "spring", damping: 30, stiffness: 1000 }}
            rotationInterval={3200}
          />
        </Box>
      </Flex>
      <Flex gap={4} flexWrap={"wrap"} justifyContent={"center"}>
        {projects.map((project, index) => {
          return (
            <ProjetCard key={index} project={project} animationDelay={index} />
          );
        })}
      </Flex>
    </Container>
  );
}
