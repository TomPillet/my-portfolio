"use client";
import React from "react";
import ShinyText from "@/reactbits/text-animations/ShinyText/ShinyText";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Separator,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import DynamicShinyText from "@/components/ui/DynamicShinyText";

export default function Home() {
  const keySkills = ["React", "Nest", "PHP", "Wordpress", "Java"];

  return (
    <Container maxW="6xl" pt="120px">
      <Flex
        w="full"
        justifyContent="center"
        alignItems="center"
        flexDir={"column"}
      >
        <Flex h={"300px"} w={"full"}>
          <Flex flexDir={"column"} w={"full"} gap={8} justifyContent={"center"}>
            <Heading
              as="h1"
              fontSize={"6xl"}
              textAlign={"center"}
              display={"flex"}
              flexDir={"column"}
              gap={8}
            >
              <Text>Tom</Text>
              <Text>PILLET-GAULON</Text>
            </Heading>
            <Heading
              as="h2"
              fontSize={"3xl"}
              textAlign={"center"}
              fontStyle={"italic"}
              fontWeight={"400"}
            >
              <ShinyText
                text="Développeur fullstack"
                speed={3}
                className="sapin-color"
              />
            </Heading>
            <Text fontSize={"xl"} fontWeight={"300"} textAlign={"center"}>
              Je texte un peu sur moi. C{"'"}est cool d{"'"}avoir un site web !
              :) J{"'"}espère que vous y trouverez ce que vous cherchez ! Bonne
              journée ! 👋{" "}
            </Text>
          </Flex>
          <Flex w={"1/2"} justifyContent={"center"}>
            <Box
              m="auto"
              h="4/5"
              w="1/2"
              pos={"relative"}
              _before={{
                content: '""',
                position: "absolute",
                display: "block",
                height: "100%",
                width: "100%",
                top: "20px",
                left: "20px",
                border: "2px solid white",
                borderRadius: "10px",
                background: "dark.darker",
              }}
            >
              <Image
                src="/photo-portfolio.jpg"
                alt="Tom"
                fill
                style={{
                  objectFit: "cover",
                  filter: "saturate(.8)",
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Flex>
        </Flex>

        <HStack w={"3/5"} mb={"80px"} mt={"40px"}>
          <Separator flex="1" variant="solid" />
          <Heading flexShrink="0" as="h2" fontSize={"2xl"} fontWeight={"400"}>
            Compétences clés
          </Heading>
          <Separator flex="1" variant="solid" />
        </HStack>

        <Flex
          w={"1/2"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          gap={"20px"}
        >
          {keySkills.map((competence, index) => (
            <DynamicShinyText key={index} text={competence} />
          ))}
          <Link
            href="/competences"
            style={{
              display: "block",
              height: "fit-content",
              width: "fit-content",
            }}
          >
            <DynamicShinyText text="Voir plus 👉" />
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}
