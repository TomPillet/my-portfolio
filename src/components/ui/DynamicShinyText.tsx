import React from "react";
import CustomBox from "./CustomBox";
import ShinyText from "@/reactbits/text-animations/ShinyText/ShinyText";

export default function DynamicShinyText({
  text,
  ...props
}: {
  text: string;
  [props: string]: any;
}) {
  const [isHover, setIsHover] = React.useState(false);
  return (
    <CustomBox
      onHover={() => setIsHover(true)}
      onOut={() => setIsHover(false)}
      {...props}
    >
      <ShinyText
        text={text}
        speed={2}
        className={isHover ? "shiny-text-hovered" : ""}
      />
    </CustomBox>
  );
}
