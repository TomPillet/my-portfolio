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
    <Container maxW={"7xl"}>
      <Flex
        py={{ lg: "120px", base: "100px" }}
        minH="100dvh"
        w="full"
        flexDir={"column"}
      >
        <Flex
          flexDir={{ xl: "row", base: "column" }}
          w="full"
          color={"light.default"}
          fontSize={{ md: "6xl", sm: "5xl", base: "4xl" }}
          fontWeight={"700"}
          lineHeight={2}
          textTransform={"uppercase"}
          mb={8}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Heading
            as="h1"
            h="fit"
            w={{ xl: "1/3", base: "full" }}
            pb={1}
            variant={"mainTitle"}
          >
            Mes projets
          </Heading>
          <Box
            transition={"all 0.2s ease-in-out"}
            bg="primary.default"
            px={4}
            mt={1}
            pos="relative"
            rounded={"2xl"}
            lineHeight={1.6}
            overflow={"hidden"}
            _hover={{
              "& .light-bg": {
                width: "120%",
              },
            }}
          >
            <Box
              pos="absolute"
              w="0%"
              h="full"
              top={0}
              left={"-10%"}
              bg="primary.hover"
              transform={"skewX(-16deg)"}
              transition={"all 0.2s ease-in-out"}
              className="light-bg"
            ></Box>
            <RotatingText
              texts={["Professionnels", "Personnels", "Universitaires"]}
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              staggerDuration={0.025}
              transition={{ type: "spring", damping: 30, stiffness: 1000 }}
              rotationInterval={3200}
            />
          </Box>
        </Flex>
        <Flex gap={4} flexWrap={"wrap"} justifyContent={"center"}>
          {projects.map((project, index) => {
            return (
              <ProjetCard
                key={index}
                project={project}
                animationDelay={index}
              />
            );
          })}
        </Flex>
      </Flex>
    </Container>
  );
}
