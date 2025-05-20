import ProjetCard from "@/components/layout/ProjetCard";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { Project } from "@prisma/client";
import React from "react";

export default function Projets() {
  const projects: Project[] = [
    {
      id: 1,
      slug: "",
      title: "Projet 1",
      description: "Description du projet 1",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsoftwarewebsas.com%2Fpublic%2Fimages%2Fblog%2Fdev.webp&f=1&ipt=5baea3e1fddfec31f0d9e80fe8cca937a1ddedd3c88a504d9f7b75c769d351c9",
      gitLink: "",
      date: new Date(),
    },
    {
      id: 1,
      slug: "",
      title: "Projet 1",
      description: "Description du projet 1",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fchef-de-projet.fr%2Fwp-content%2Fuploads%2F2022%2F12%2FGestion-de-projet.png&f=1&ipt=0fd4be6a0d4616576d79b859bc08ea68a8a21669535c04e522615c01c86439bb",
      gitLink: "",
      date: new Date(),
    },
  ];

  return (
    <Container maxW={"6xl"} pt="120px">
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
