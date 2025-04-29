import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Image from "next/image";
import Lanyard from "@/reactbits/components/Lanyard/Lanyard";

export default function Home() {
  return (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <Flex h="3/5" w="3/5" p="12" bg="#101010" rounded="64px">
        <Grid templateColumns="repeat(2, 1fr)" border="2px solid #c3c3c3" rounded="32px" overflow={"hidden"}>
          <GridItem h="full" bg="#131313">
            <Lanyard position={[0, 0, 16]} gravity={[0, -40, 0]} />
          </GridItem>
          <GridItem h="full" bg="#101010" px="16" py="12">
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies elit ut ultrices suscipit. Aliquam sodales tristique ipsum. Vestibulum eu lectus lacinia justo pretium volutpat.</Text>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
}
