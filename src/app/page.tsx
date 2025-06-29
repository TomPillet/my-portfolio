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
import { FaAngleRight } from "react-icons/fa";
import CustomButton from "@/components/ui/CustomButton";

export default function Home() {
  const keySkills = ["React", "NextJS", "Nest", "PHP", "Java"];
  const cvUrl =
    "https://drive.google.com/file/d/1p4ZT75-VEdRZHwvGWj36p_PGZevZcy68/view?usp=sharing";

  return (
    <Container maxW="7xl">
      <Flex
        py={{ lg: "100px", base: "60px" }}
        minH={"100dvh"}
        w="full"
        justifyContent="center"
        alignItems={"center"}
        flexDir={"column"}
        gap={16}
      >
        <Grid
          gridTemplateAreas={{
            lg: `"title image" "desc image" "links links"`,
            base: `"title" "desc" "image" "links"`,
          }}
          w="full"
          gapY={{ lg: 4, base: 10 }}
          px={4}
        >
          <GridItem
            gridArea={"title"}
            maxW={"2xl"}
            justifySelf={{ lg: "flex-start", base: "center" }}
          >
            <Flex flexDir={"column"} w={"fit"} m={"auto"}>
              <Heading as="h1" variant={"mainTitle"}>
                Tom PILLET-GAULON
              </Heading>
              <Heading
                as="h2"
                variant={"skinnyTitle"}
                pl={2}
                m={{ lg: "0", base: "auto" }}
                textAlign={{ lg: "left", base: "center" }}
              >
                <ShinyText text="Développeur Web & Logiciel" speed={2} />
              </Heading>
            </Flex>
          </GridItem>
          <GridItem
            gridArea={"desc"}
            maxW={"2xl"}
            pl={2}
            justifySelf={{ lg: "flex-start", base: "center" }}
            textAlign={{ lg: "left", base: "center" }}
          >
            <Flex flexDir={"column"} gap={4}>
              <Text fontSize={"lg"}>
                <strong>Développeur fullstack</strong> passionné et
                touche-à-tout, <strong>expert en ingénierie logicielle</strong>,
                j{"'"}aime transformer des idées en solutions concrètes et
                utiles.
              </Text>
              <Text fontSize={"lg"}>
                Mon objectif est de devenir un <strong>développeur</strong>{" "}
                toujours plus compétent, créatif, polyvalent et rigoureux.
              </Text>
              <Text fontSize={"lg"}>
                Ce qui m{"'"}anime : être à l{"'"}écoute et soucieux de l{"'"}
                <strong>expérience utilisateur</strong> !
              </Text>
            </Flex>
          </GridItem>
          <GridItem gridArea={"image"}>
            <Flex justifyContent={{ lg: "flex-end", base: "center" }}>
              <Box
                h="240px"
                w="200px"
                pos={"relative"}
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
          <GridItem gridArea={"links"} w={"full"}>
            <Flex w="full" justifyContent={"center"} pt={4}>
              <Link href={cvUrl} target="_blank" rel="noopener noreferrer">
                <Magnet padding={50} disabled={false} magnetStrength={2}>
                  <CustomButton py={2} transform={"scale(1.1)"}>
                    <ShinyText
                      text="Consulter le CV"
                      speed={2}
                      className={"primary-color"}
                    />
                    <Icon as={AiOutlineCloudDownload} />
                  </CustomButton>
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
            w={{ lg: "1/2", base: "3/4" }}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"space-around"}
            flexWrap={"wrap"}
            gap={{ lg: 8, base: 4 }}
          >
            <Flex
              flexDir={"row"}
              flexWrap={"wrap"}
              justifyContent={"center"}
              gap={{ lg: 8, base: 4 }}
            >
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
                  text={"Voir plus"}
                  speed={2}
                  className={"primary-color"}
                />
                <Icon as={FaAngleRight} ml={1} color={"primary.default"} />
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
