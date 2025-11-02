"use client";

import {
  Container,
  Flex,
  Heading,
  Icon,
  List,
  Span,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import ExperienceSkills from "@/components/layout/skills/ExperienceSkills";

const FlexMotion = motion.create(Flex);

export default function Experiences() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      startDate: "05-29-2025",
      endDate: "",
      etablissement: "ETS",
      location: "",
      logo: "/etablissements/ets.png",
      url: "https://www.etsglobal.org/",
      title: `Certification TOEIC "Listening & Reading"`,
      details: [
        "Score des tests : 480/495 (niveau B2) en Listening, 455/495 (niveau C1) en Reading.",
      ],
    },
    {
      startDate: "09-02-2024",
      endDate: "",
      etablissement: "Cadcom",
      location: "Saône",
      logo: "/etablissements/cadcom.jpg",
      url: "https://www.cadcom-studio.fr/",
      title: "Alternant développeur fullstack",
      details: [
        "Intégration, maintenance et développement de sites et plugins WordPress.",
        "Configuration, déploiement et maintenance de serveurs OVH.",
        "Développement de l'interface et de l'API d'une application mobile de réseautage.",
        "Refonte architecturale et technologique du site web de l'agence, avec du WordPress en headless.",
        "Etude de SEO (sur une part de la concurrence) et des bonnes pratiques de référencement.",
        "Développement frontend et référencement de sites E-Commerce (domaines : alimentaire et textile).",
      ],
      techSkills: [
        "javascript",
        "react",
        "nextjs",
        "nestjs",
        "wordpress",
        "chakra-ui",
        "tailwind",
        "php",
        "docker",
        "linux",
        "git",
        "prisma",
        "sql",
      ],
      softSkills: [
        "team-work",
        "adaptability",
        "critical-thinking",
        "curiosity",
        "rigor",
      ],
    },
    {
      startDate: "09-04-2023",
      endDate: "06-28-2024",
      etablissement: "Capgemini",
      location: "Belfort",
      logo: "/etablissements/capgemini.png",
      url: "https://www.capgemini.com/",
      title: "Alternant développeur fullstack",
      details: [
        "Maintenance corrective, évolutive et préventive (tests automatisés) d'applications et logiciels d'industrie automobile.",
        "Chargé de l'analyse des besoins utilisateurs et de la maintenance d'une application de management.",
        "Développement d'une application mobile d'évaluation d'extraits de terre par intelligence artificielle.",
      ],
      techSkills: [
        "typescript",
        "angular",
        "java",
        "tailwind",
        "docker",
        "linux",
        "git",
      ],
      softSkills: [
        "team-work",
        "communication",
        "adaptability",
        "active-listening",
        "organization",
        "rigor",
        "attention-to-details",
      ],
    },
    {
      startDate: "09-04-2023",
      endDate: "",
      etablissement: "ISCOD",
      location: "Besançon",
      logo: "/etablissements/iscod.jpg",
      url: "https://www.iscod.fr/",
      title: "Mastère Expert en Ingénierie Informatique",
      details: [
        "Apprentissages sur le Big Data, l'architecture logicielle, l'algorithmie, le machine learning et les tests automatisés.",
        "Approfondissement des concepts et technologies du développement web, mobile et logiciel.",
        "Formation au pilotage de projet, au DevOps, au leadership et au management d'équipe.",
      ],
    },
    {
      startDate: "01-30-2023",
      endDate: "03-31-2023",
      etablissement: "BWA",
      location: "Dijon",
      logo: "/etablissements/bwa.png",
      url: "https://www.business-web-agence.com/",
      title: "Développeur Prestashop",
      details: [
        "Intégration de maquettes d'une application de restauration en ligne.",
        "Maintenance corrective et service client de sites E-Commerce.",
      ],
      techSkills: ["prestashop", "php", "linux", "git"],
      softSkills: [
        "team-work",
        "communication",
        "active-listening",
        "curiosity",
      ],
    },
    {
      startDate: "10-03-2022",
      endDate: "01-27-2023",
      etablissement: "Crédit Agricole",
      location: "Besançon",
      logo: "/etablissements/ca.png",
      url: "https://www.credit-agricole.fr/",
      title: "Analyste développeur Laravel",
      details: [
        "Chargé du projet de refonte architecturale et graphique d'une application de gestion de contrats régionaux.",
        "Maintenance et assistance utilisateur sur des applications et outils bancaires internes.",
      ],
      techSkills: [
        "javascript",
        "vuejs",
        "tailwind",
        "php",
        "laravel",
        "git",
        "sql",
      ],
      softSkills: [
        "communication",
        "critical-thinking",
        "active-listening",
        "organization",
        "rigor",
        "attention-to-details",
      ],
    },
    {
      startDate: "09-06-2021",
      endDate: "08-26-2022",
      etablissement: "Perfony",
      location: "Paris",
      logo: "/etablissements/perfony.png",
      url: "https://www.perfony.com/",
      title: "Alternant développeur fullstack",
      details: [
        "Maintenance corrective, évolutive et préventive d'une application d'ERP pour PME.",
        "Conception d'interfaces modernes et responsives sur Figma.",
      ],
      techSkills: ["typescript", "angular", "php", "git", "sql", "linux"],
      softSkills: [
        "team-work",
        "active-listening",
        "curiosity",
        "rigor",
        "attention-to-details",
      ],
    },
    {
      startDate: "09-01-2021",
      endDate: "08-26-2022",
      etablissement: "UFR ST",
      location: "Besançon",
      logo: "/etablissements/ufr-st.ico",
      url: "http://sciences.univ-fcomte.fr/",
      title: "Licence Pro Systèmes d'Information Logiques",
      details: [
        "Introduction à la programmation logicielle et mobile, aux algorithmes et à l'administration de bases de données et réseaux.",
        "Approfondissement des concepts de gestion de projet et de conception d'applications web.",
      ],
    },
    {
      startDate: "04-05-2021",
      endDate: "06-25-2021",
      etablissement: "Ministère de l'Economie",
      location: "Paris",
      logo: "/etablissements/min-eco.ico",
      url: "https://www.economie.gouv.fr/",
      title: "Stagiaire UI/UX Designer et Intégrateur web",
      details: [
        "Conception et intégration des maquettes pour la refonte d'applications administratives.",
      ],
      techSkills: ["javascript", "git", "linux"],
      softSkills: [
        "critical-thinking",
        "active-listening",
        "rigor",
        "attention-to-details",
      ],
    },
    {
      startDate: "09-03-2019",
      endDate: "07-09-2021",
      etablissement: "IUT Nancy-Charlemagne",
      location: "Nancy",
      logo: "/etablissements/iut-nancy.png",
      url: "https://iut-charlemagne.univ-lorraine.fr/",
      title: "DUT Métiers du Multimédia et de l'Internet",
      details: [
        "Introduction à la conception d'interfaces, à la modélisation 3D, au développement de sites web et de jeux vidéo.",
        "Approfondissement des compétences en audiovisuel, de la réalisation à la postproduction.",
        "Apprentissage des concepts de base en communication et gestion de projet",
      ],
    },
  ];

  const goToStep = (step: any) => {
    if (step == currentStep) {
      return;
    }
    setCurrentStep(step);
  };

  return (
    <Container maxW={"4xl"}>
      <Flex
        py={{ lg: "150px", base: "120px" }}
        minH={"100dvh"}
        w="full"
        flexDir={"column"}
        gap={8}
      >
        <Flex flexDir={"column"} alignItems={"center"} gap={4}>
          <Heading as="h1" textAlign={"center"} variant={"mainTitle"}>
            Mon parcours
          </Heading>
        </Flex>
        <Flex flexDir="column" gap={12} py={12} w={"100%"}>
          {steps.map((step, index) => {
            const isStepCurrent = currentStep == index;
            return (
              <Flex
                key={index}
                flexDir={{ md: "row", base: "column" }}
                maxW={"100%"}
                gap={4}
                alignItems={{ md: "center", base: "flex-start" }}
                onClick={() => goToStep(index)}
                cursor={isStepCurrent ? "default" : "pointer"}
              >
                <Heading
                  as="h3"
                  h={"fit"}
                  minW={"100px"}
                  color={isStepCurrent ? "light.default" : "light.dirty"}
                  fontSize={isStepCurrent ? "3xl" : "2xl"}
                  fontWeight={isStepCurrent ? "700" : "500"}
                  textAlign={{ md: "right", base: "left" }}
                >
                  {new Date(step.startDate).getFullYear()}
                </Heading>
                <Flex flexDir={"column"} gap={{ md: 2, base: 0 }}>
                  <Heading
                    as="h3"
                    w={"full"}
                    color={isStepCurrent ? "light.default" : "light.dirty"}
                    fontSize={isStepCurrent ? "3xl" : "2xl"}
                    fontWeight={isStepCurrent ? "700" : "500"}
                    textTransform={isStepCurrent ? "uppercase" : "none"}
                    wordBreak={"break-word"}
                  >
                    {step.title} -{" "}
                    {isStepCurrent ? (
                      <Flex
                        display={"inline-flex"}
                        flexDir={"row"}
                        flexWrap={"wrap"}
                        gap={2}
                        w={"fit"}
                      >
                        <Link target="_blank" href={step.url}>
                          <Span
                            color={"primary.default"}
                            _hover={{ color: "primary.hover" }}
                          >
                            {step.etablissement}
                          </Span>
                        </Link>
                        <Image
                          src={step.logo}
                          alt={step.etablissement}
                          height={30}
                          width={30}
                        />
                      </Flex>
                    ) : (
                      step.etablissement
                    )}
                  </Heading>
                  <AnimatePresence initial={true}>
                    {isStepCurrent ? (
                      <FlexMotion
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "fit-content", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        flexDir={"column"}
                      >
                        <Flex gap={2} alignItems={"center"}>
                          <Icon as={FaCalendarDays} />
                          <Span fontStyle={"italic"}>
                            Du {new Date(step.startDate).toLocaleDateString()}
                            {step.endDate.length > 0
                              ? ` au ${new Date(step.endDate).toLocaleDateString()}`
                              : " à aujourd'hui"}
                          </Span>
                          {step.location.length > 0 && (
                            <>
                              <Icon as={FaMapMarkerAlt} />
                              <Span fontStyle={"italic"}>{step.location}</Span>
                            </>
                          )}
                        </Flex>
                        <List.Root
                          pos={"relative"}
                          left={2}
                          borderLeft={"1px solid"}
                          borderColor={"light.dirty"}
                          mb={2}
                        >
                          {step.details.map((item, index) => (
                            <List.Item
                              key={index}
                              color={"light.dirty"}
                              fontSize={"md"}
                              fontWeight={"500"}
                              pl={4}
                              listStyle={"none"}
                              transition={"all 0.3s ease-in-out"}
                              wordBreak={"break-word"}
                              _hover={{ color: "light.default", pl: 6 }}
                            >
                              <Span mr={2}>.</Span>
                              {item}
                            </List.Item>
                          ))}
                        </List.Root>
                        {step.techSkills && (
                          <>
                            <Span>Technologies : </Span>
                            <ExperienceSkills skillsSlugs={step.techSkills} />
                          </>
                        )}
                        {step.softSkills && (
                          <>
                            <Span>Savoir-être : </Span>
                            <ExperienceSkills skillsSlugs={step.softSkills} />
                          </>
                        )}
                      </FlexMotion>
                    ) : null}
                  </AnimatePresence>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Container>
  );
}
