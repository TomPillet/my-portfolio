"use client";
import SoftSkills from "@/components/layout/skills/SoftSkills";
import TechSkills from "@/components/layout/skills/TechSkills";
import { Container, Flex, Heading, Tabs } from "@chakra-ui/react";
import React from "react";

const competencesTabs = [
  {
    label: "Techniques",
    value: "tech",
    component: <TechSkills />,
  },
  {
    label: "Humaines",
    value: "soft",
    component: <SoftSkills />,
  },
];

export default function Competences() {
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
          Mes compétences
        </Heading>
        <Tabs.Root
          defaultValue={competencesTabs[0].value}
          variant={"enclosed"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          gap={8}
        >
          <Tabs.List _before={{ display: "none" }}>
            {competencesTabs.map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                w={"fit"}
                fontWeight={"bold"}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {competencesTabs.map((tab) => (
            <Tabs.Content
              key={tab.value}
              value={tab.value}
              _open={{
                animationName: "fade-in, scale-in",
                animationDuration: "300ms",
              }}
              _closed={{
                animationName: "fade-out, scale-out",
                animationDuration: "120ms",
              }}
            >
              {tab.component}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Flex>
    </Container>
  );
}
