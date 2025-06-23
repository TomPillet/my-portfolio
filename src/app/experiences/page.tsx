"use client";
import React from "react";
import { Container, Flex, Heading } from "@chakra-ui/react";

export default function Experiences() {
  return (
    <Container maxW="7xl">
      <Flex
        py={{ lg: "60px", base: "40px" }}
        minH={"100dvh"}
        w="full"
        justifyContent="center"
        alignItems={"center"}
        flexDir={"column"}
        gap={16}
      >
        <Flex flexDir={"column"} alignItems={"center"} gap={4}>
          <Heading as="h1" textAlign={"center"} variant={"mainTitle"}>
            Mes expériences
          </Heading>
        </Flex>
      </Flex>
    </Container>
  );
}
