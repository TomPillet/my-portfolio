"use client";
import SplitText from "@/reactbits/text-animations/SplitText/SplitText";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex fontSize={"5rem"} letterSpacing={"-2px"} w="full" justifyContent="center" alignItems="center" flexDir={"column"}>
      <SplitText
        text="Tom Pillet-Gaulon"
        className="text-2xl font-semibold text-center"
        delay={80}
        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
        threshold={0.2}
        easing={(t) => t}
        rootMargin="-50px"
        onLetterAnimationComplete={() => {console.log('complete')}}
      />
      <Grid h={"400px"} w={"1/2"} 
      templateRows="repeat(2, 1fr)" templateColumns={"repeat(2, 1fr)"}>
        <GridItem rowSpan={2} bg={"red"}></GridItem>
        <GridItem bg={"blue"}></GridItem>
        <GridItem bg={"green"}></GridItem>
      </Grid>
    </Flex>
  );
}
