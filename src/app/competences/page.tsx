"use client"
import SpotlightCard from '@/reactbits/components/SpotlightCard/SpotlightCard';
import { Flex, Container, Grid, GridItem, Heading } from '@chakra-ui/react'
import React from 'react'
import { Projet } from '../projets/page';

export default function Competences() {
  const skills = ["React", "React Native", "Angular", "NextJS", "Nest", "PHP", "Wordpress", "Java", "Docker", "Kubernetes", "Laravel"];
  return (
    <Container maxW={"conatiner.xl"} pt="120px">
      <Heading as="h1" fontSize={"6xl"} textAlign={"center"} h="fit" lineHeight={2}>Mes compétences</Heading>
      <Grid templateColumns={"repeat(5, 1fr)"} autoRows={"200px"} gap={12}>
        {skills.map((skill, index) => {
          return (
            <GridItem key={index} h="full" w="full">
              <SpotlightCard className='skill-spotlight-card' spotlightColor="rgba(255, 255, 255, 0.25)">
                <Flex h="full" w="full" p={4} bg="#101010" justifyContent="center" alignItems={"center"} >
                  <Heading as="h2" fontSize={"2xl"}>{skill}</Heading>
                </Flex>
              </SpotlightCard>
            </GridItem>
          )
        })}
      </Grid>
    </Container>
  )
}

interface Skill {
  title: string,
  slug: string,
  level: SkillLevel,
  projets: Projet[],
  logo: string
}

enum SkillLevel {
  JUNIOR = "junior",
  INTERMEDIATE = "intermédiaire",
  CONFIRM = "confirmé",
  SENIOR = "senior",
  EXPERT = "expert"
}