"use client"

import React from 'react'
import Aurora from '@/reactbits/backgrounds/Aurora/Aurora'
import { Box, Flex, Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function Header() {
    const [showAurora, setShowAurora] = React.useState(false)

  return (
    <Flex h="200px" w="full" pos="relative">
        <Box h="full" w="full" pos="absolute" opacity={ showAurora ? ".6" : "0" }>
            <Aurora
                colorStops={["#2C5E4C", "#1E5631", "#164A20"]}
                blend={0.6}
                amplitude={0.6}
                speed={1.2}
            />
        </Box>

        <Flex h="1/3" w="full" justifyContent="space-around" pos="relative" zIndex={1}>
            <Link href="/" style={{ height: "100%", width: "100%" }}>
                <Button w="full" link cursor={"pointer"}>Accueil</Button>
            </Link>
            <Link href="/competences" style={{ height: "100%", width: "100%" }}>
                <Button w="full" link cursor={"pointer"}>Compétences</Button>
            </Link>
            <Link href="/projets" style={{ height: "100%", width: "100%" }}>
                <Button w="full" link cursor={"pointer"}>Projets</Button>
            </Link>
            <Link href="/contact" style={{ height: "100%", width: "100%" }}>
                <Button w="full" link cursor={"pointer"}>Contact</Button>
            </Link>
        </Flex>

        <Button pos="absolute" top="20px" left="20px" zIndex={10} onClick={() => setShowAurora(!showAurora)}>A</Button>
    </Flex>
  )
}
