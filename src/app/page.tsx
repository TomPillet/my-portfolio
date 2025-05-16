"use client";
import React from "react";
import ShinyText from "@/reactbits/text-animations/ShinyText/ShinyText";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Separator,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const CustomBox = ({
  children,
  onHover,
  onOut,
  ...props
}: {
  children: React.ReactNode;
  onHover?: () => void;
  onOut?: () => void;
}) => (
  <Box
    {...props}
    border={"1px solid rgba(255,255,255,0.4)"}
    borderRadius={"10px"}
    px={"20px"}
    py={"12px"}
    width={"fit"}
    bg={"#101010"}
    transition={"all 0.3s ease-in-out"}
    _hover={{
      background: "#161616",
      border: "1px solid #2C5E4C",
      boxShadow: "0px 0px 4px #1E5631",
      scale: "1.05",
    }}
    onMouseOver={onHover}
    onMouseOut={onOut}
  >
    {children}
  </Box>
);

export default function Home() {
  const keySkills = ["React", "Nest", "PHP", "Wordpress", "Java"];
  const [isMoreSkillsHover, setIsMoreSkillsHover] = React.useState(false);

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
            <Text fontSize={"xl"} fontWeight={"300"}>
              Je texte un peu sur moi. C'est cool d'avoir un site web ! :)
              J'espère que vous y trouverez ce que vous cherchez ! Bonne journée
              ! 👋{" "}
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
                background: "#101010",
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
          <Separator flex="1" variant="dashed" />
          <Heading flexShrink="0" as="h2" fontSize={"2xl"} fontWeight={"400"}>
            Compétences clés
          </Heading>
          <Separator flex="1" variant="dashed" />
        </HStack>

        <Flex
          w={"1/2"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          gap={"20px"}
        >
          {keySkills.map((competence, index) => {
            const [isHover, setIsHover] = React.useState(false);
            return (
              <CustomBox
                key={index}
                onHover={() => setIsHover(true)}
                onOut={() => setIsHover(false)}
              >
                <ShinyText
                  text={competence}
                  speed={2}
                  className={isHover ? "shiny-text-hovered" : ""}
                />
              </CustomBox>
            );
          })}
          <Link
            href="/competences"
            style={{
              display: "block",
              height: "fit-content",
              width: "fit-content",
            }}
          >
            <CustomBox
              onHover={() => setIsMoreSkillsHover(true)}
              onOut={() => setIsMoreSkillsHover(false)}
            >
              <ShinyText
                text="Voir plus 👉"
                speed={2}
                className={isMoreSkillsHover ? "shiny-text-hovered" : ""}
              />
            </CustomBox>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}
