import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Lanyard from "@/reactbits/components/Lanyard/Lanyard";
import Link from "next/link";

export default function Home() {
  return (
    <Flex h="100dvh" justifyContent="center" alignItems="center">
      <Flex h="3/5" w="3/5" p="12" bg="#101010" rounded="64px">
        <Grid templateColumns="repeat(2, 1fr)" border="2px solid #c3c3c3" rounded="32px" overflow={"hidden"}>
          <GridItem h="full" bg="#131313">
            <Lanyard position={[0, 0, 16]} gravity={[0, -40, 0]} />
          </GridItem>
          <GridItem h="full" bg="#101010" px="16" py="12">
            <Flex w="full" justifyContent="space-around">
              <Link href="/competences">
                <Button link cursor={"pointer"}>Compétences</Button>
              </Link>
              <Link href="/projets">
                <Button link cursor={"pointer"}>Projets</Button>
              </Link>
              <Link href="/contact">
                <Button link cursor={"pointer"}>Contact</Button>
              </Link>
            </Flex>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies elit ut ultrices suscipit. Aliquam sodales tristique ipsum. Vestibulum eu lectus lacinia justo pretium volutpat.</Text>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
}
