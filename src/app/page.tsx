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
  const keySkills = [
    "Angular",
    "React",
    "NextJS",
    "Javascript",
    "Nest",
    "Typescript",
    "PHP",
    "Java",
  ];
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
        gap={24}
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
            <Flex w="full" justifyContent={"space-around"} pt={4}>
              <Link href="#moreOnMe" rel="noopener noreferrer">
                <Magnet padding={50} disabled={false} magnetStrength={2}>
                  <CustomButton py={2} transform={"scale(1.1)"}>
                    <ShinyText
                      text="En savoir plus sur moi"
                      speed={2}
                      className={"primary-color"}
                    />
                  </CustomButton>
                </Magnet>
              </Link>
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

        <Flex w={"full"} flexDir={"column"} alignItems={"center"} gap={12}>
          <HStack w={"full"}>
            <Separator
              flex="1"
              variant="solid"
              borderColor={"light.dirty"}
              size="lg"
            />
            <Heading
              flexShrink="0"
              as="h2"
              variant={"secondTitle"}
              textTransform={"uppercase"}
            >
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
            gap={6}
          >
            <Flex
              flexDir={"row"}
              flexWrap={"wrap"}
              justifyContent={"center"}
              gap={6}
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

        <Flex
          id="moreOnMe"
          w={"full"}
          flexDir={"column"}
          alignItems={"center"}
          gap={8}
        >
          <HStack w={"full"}>
            <Separator
              flex="1"
              variant="solid"
              borderColor={"light.dirty"}
              size="lg"
            />
            <Heading
              flexShrink="0"
              as="h2"
              variant={"secondTitle"}
              textTransform={"uppercase"}
            >
              A propos de moi
            </Heading>
            <Separator
              flex="1"
              variant="solid"
              borderColor={"light.dirty"}
              size="lg"
            />
          </HStack>

          <Flex flexDir={"column"} gap={2} px={16}>
            <Heading as="h2" variant={"secondTitle"}>
              Mes valeurs
            </Heading>
            <Text
              fontSize={"lg"}
              textAlign={"justify"}
              textIndent={"2em each-line"}
              whiteSpace={"pre-line"}
            >
              En tant que développeur, je valorise{" "}
              <strong>
                l{"'"}
                autonomie
              </strong>{" "}
              et <strong>la polyvalence</strong> : ma capacité à prendre en
              charge un projet de bout en bout reflète mon goût pour la
              responsabilité et la vision globale du produit.
              <br />
              <br />
              De nature éclectique et aspirant à un monde à l{"'"}équilibre, je
              crois profondément en{" "}
              <strong>la montée en compétences constante</strong> et en{" "}
              <strong>la curiosité intellectuelle</strong>. Je fais refléter cet
              aspect de moi y compris dans mon travail, en utilisant par exemple
              au quotidien Linux et des applications open-source, en programmant
              mon propre serveur mail pour apprendre à être plus indépendant
              numériquement, ce qui témoigne d{"'"}une recherche de{" "}
              <strong>maîtrise</strong> et d{"'"}
              <strong>efficacité</strong> en privilégiant les outils qui offrent
              contrôle et flexibilité.
              <br />
              <br />
              Sur le plan humain, je valorise toujours{" "}
              <strong>la communication</strong>,{" "}
              <strong>la transparence</strong> et{" "}
              <strong>le travail d{"'"}équipe</strong>, qui sont pour moi des
              valeurs clés dans la réussite d{"'"}un projet. Je ne rechigne
              jamais sur la qualité du code et des directives de développement,
              considérant que bien faire et cadrer les choses dès le départ est
              un investissement pour l{"'"}avenir. Mon aspiration à devenir Chef
              de Projet révèle un intérêt pour{" "}
              <strong>la dimension collective du travail</strong>, où la
              réussite se mesure autant à la qualité technique qu
              {"'"}à la capacité de fédérer et de guider une équipe vers un
              objectif commun.
            </Text>
          </Flex>

          <Flex flexDir={"column"} gap={2} px={16}>
            <Heading as="h2" variant={"secondTitle"}>
              Mon projet professionnel
            </Heading>
            <Text
              fontSize={"lg"}
              textAlign={"justify"}
              textIndent={"2em each-line"}
              whiteSpace={"pre-line"}
            >
              Mon parcours en <strong>développement web</strong>, forgé à
              travers trois années d{"'"}alternance, m{"'"}a permis de maîtriser
              l{"'"}ensemble de la chaîne de production d{"'"}une application
              web, du code au déploiement. Actuellement en{" "}
              <strong>Master Big Data et IA à l{"'"}ISCOD</strong>, et en
              alternance chez <strong>Everysens</strong> où je travaille ma
              vision globale du produit, je construis activement les compétences
              nécessaires pour évoluer ultérieurement vers un rôle de{" "}
              <strong>Chef de Projet en informatique</strong>.
              <br />
              <br />
              Mon objectif est de combiner mon expertise technique en
              <strong>développement full-stack</strong> avec ma compréhension
              croissante des enjeux du <strong>Big Data</strong> et de l{"'"}
              <strong>Intelligence Artificielle</strong>. Je souhaite à terme
              piloter des <strong>projets transverses</strong> où technologie
              web, analyse de données et IA convergent pour créer des solutions
              innovantes.
              <br />
              <br />J{"'"}ai conscience d{"'"}avoir encore beaucoup à apprendre,
              tant sur le plan technique que managérial, et c{"'"}est cette
              perspective <strong>d{"'"}évolution continue</strong> qui nourrit
              continuellement ma motivation et guide mes choix de formation et d
              {"'"}expériences professionnelles.
              <br />
              <br />
              Mon expérience actuelle chez Everysens m{"'"}offre l{"'"}
              opportunité de mettre à l{"'"}épreuve ces compétences sur des
              <strong>projets d{"'"}envergure internationale</strong>,
              renforçant ainsi ma capacité à gérer des défis complexes et à
              collaborer efficacement au sein d{"'"}une équipe dynamique.
            </Text>
          </Flex>

          <Flex flexDir={"column"} gap={2} px={16}>
            <Heading as="h2" variant={"secondTitle"}>
              Mes centres d{"'"}intérêt
            </Heading>
            <Text
              fontSize={"lg"}
              textAlign={"justify"}
              textIndent={"2em each-line"}
              whiteSpace={"pre-line"}
            >
              Mes centres d{"'"}intérêt reflètent une{" "}
              <strong>curiosité profonde</strong> et un besoin de{" "}
              <strong>comprendre les mécanismes en profondeur</strong>. Je suis
              particulièrement attiré par <strong>les sciences</strong>,
              notamment l{"'"}
              astronomie et la physique, domaines où chaque découverte révèle de
              nouvelles questions et nourrit ma soif de compréhension. Cette
              approche analytique s{"'"}étend naturellement à ma pratique du
              développement : j{"'"}aime maîtriser de A à Z les outils et
              frameworks que j{"'"}utilise, ce qui explique mon intérêt pour
              <strong>Linux</strong> et ma volonté constante de diversifier mes
              compétences techniques.
              <br />
              <br />
              Je trouve également inspiration et détente dans{" "}
              <strong>les arts</strong> : cinéma, lecture, musique et même
              théâtre (autant en tant que comédien que spectateur). Sans omettre
              aussi <strong>les jeux vidéo</strong>, avec une prédilection dans
              ces derniers pour les titres qui allient{" "}
              <strong>réflexion stratégique</strong> et{" "}
              <strong>immersion</strong>. J{"'"}
              apprécie autant les FPS compétitifs qui demandent précision et
              réactivité, que les jeux de gestion et de stratégie où l{"'"}
              optimisation et la planification sont essentielles, ou encore les
              expériences narratives riches qui me plongent dans des univers
              travaillés.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
