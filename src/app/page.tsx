"use client";
import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Highlight,
  HStack,
  Icon,
  Separator,
  Span,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import ShinyText from "@/reactbits/text-animations/ShinyText/ShinyText";
import Magnet from "@/reactbits/animations/Magnet/Magnet";
import { AiOutlineCloudDownload } from "react-icons/ai";

export default function Home() {
  const keySkills = ["React", "NextJS", "Nest", "PHP", "Java"];
  const cvUrl =
    "https://drive.google.com/uc?export=download&id=1EScmQhCf7Es0_310ss9vfrQ8JaLg_f-7";

  return (
    <Container maxW="6xl" pt="120px">
      <Flex w="full" justifyContent="center" flexDir={"column"} gap={16}>
        <Grid
          gridTemplateAreas={`"title image" "desc image" "links links"`}
          w="full"
          gapY={4}
          px={4}
        >
          <GridItem gridArea={"title"} w={"2xl"}>
            <Flex flexDir={"column"} w={"fit"}>
              <Heading as="h1" variant={"mainTitle"}>
                Tom PILLET-GAULON
              </Heading>
              <Heading
                as="h2"
                variant={"skinnyTitle"}
                fontStyle={"italic"}
                pl={4}
              >
                <ShinyText text="Développeur Fullstack" speed={2} />
              </Heading>
            </Flex>
          </GridItem>
          <GridItem gridArea={"image"}>
            <Flex justifyContent={"flex-end"}>
              <Box
                h="240px"
                w="200px"
                pos={"relative"}
                mr={4}
                _before={{
                  content: '""',
                  position: "absolute",
                  display: "block",
                  height: "100%",
                  width: "100%",
                  top: "20px",
                  left: "20px",
                  border: "2px solid",
                  borderColor: "light.default",
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
          </GridItem>
          <GridItem gridArea={"desc"} maxW={"2xl"} px={8}>
            <Text fontSize={"lg"}>
              🤖 <strong>Développeur web</strong> passionné, curieux et
              touche-à-tout, j{"'"}aime <strong>coder</strong> et transformer
              des idées en projets concrets et utiles. Mon objectif est de
              devenir un <strong>développeur web</strong> toujours plus
              compétent, créatif et rigoureux.
            </Text>
            <Text fontSize={"lg"} pt={2}>
              🎯 Ce qui m{"'"}anime :{" "}
              <strong>
                résoudre des problèmes réels, pour des gens réels.
              </strong>
            </Text>
          </GridItem>
          <GridItem gridArea={"links"} w={"full"}>
            <Flex w="full" justifyContent={"center"} pt={4}>
              <Link href={cvUrl} target="_blank" rel="noopener noreferrer">
                <Magnet padding={50} disabled={false} magnetStrength={2}>
                  <Button
                    border={"1px solid"}
                    borderColor={"primary.default"}
                    borderRadius={"xl"}
                    bg={"dark.lighter"}
                    color={"primary.default"}
                    px={4}
                    py={2}
                    transform={"scale(1.1)"}
                    _hover={{
                      borderColor: "primary.hover",
                      color: "primary.hover",
                    }}
                  >
                    <Icon as={AiOutlineCloudDownload} />
                    <ShinyText
                      text="Consulter le CV"
                      speed={2}
                      className={"primary-color"}
                    />
                    <Icon as={AiOutlineCloudDownload} />
                  </Button>
                </Magnet>
              </Link>
            </Flex>
          </GridItem>
        </Grid>

        <Flex w={"full"} flexDir={"column"} alignItems={"center"} gap={8}>
          <HStack w={"full"}>
            <Separator
              flex="1"
              variant="solid"
              borderColor={"light.dirty"}
              size="lg"
            />
            <Heading flexShrink="0" as="h2" variant={"secondTitle"}>
              Compétences clés
            </Heading>
            <Separator
              flex="1"
              variant="solid"
              borderColor={"light.dirty"}
              size="lg"
            />
          </HStack>

          <Flex
            w={"1/2"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
            gap={8}
          >
            <Flex flexDir={"row"} justifyContent={"center"} gap={8}>
              {keySkills.map((competence, index) => (
                <Box
                  key={index}
                  border={"1px solid"}
                  borderColor={"light.dirty"}
                  borderRadius={"xl"}
                  bg={"dark.darker"}
                  px={4}
                  py={2}
                >
                  <ShinyText text={competence} speed={2} />
                </Box>
              ))}
            </Flex>
            <Link
              href="/competences"
              style={{
                display: "block",
                height: "fit-content",
                width: "fit-content",
              }}
            >
              <Flex
                pos="relative"
                alignItems={"center"}
                border={"1px solid"}
                borderColor={"primary.default"}
                borderRadius={"xl"}
                bg={"dark.lighter"}
                h={10}
                px={4}
                overflow={"hidden"}
                transform={"scale(1.1)"}
                transition={"all 0.2s"}
                _hover={{
                  borderColor: "light.default",
                  "& .see-more": {
                    width: "120%",
                  },
                }}
              >
                <Flex
                  className="see-more"
                  pos="absolute"
                  width={"0%"}
                  height={"100%"}
                  bg="light.default"
                  left={"-10%"}
                  top={0}
                  justifyContent={"center"}
                  alignItems={"center"}
                  overflow={"hidden"}
                  textWrap={"nowrap"}
                  transform={"skewX(-16deg)"}
                  transition={"all 0.3s"}
                >
                  <Span
                    color={"dark.default"}
                    fontSize={"xl"}
                    fontWeight={"700"}
                    textTransform={"uppercase"}
                  >
                    Voir plus
                  </Span>
                </Flex>
                <ShinyText
                  text={">> Voir plus >>"}
                  speed={2}
                  className={"primary-color"}
                />
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
