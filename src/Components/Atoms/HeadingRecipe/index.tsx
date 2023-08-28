import { Heading, SystemStyleObject } from "@chakra-ui/react";

interface Props {
  text: string;
  styles?: SystemStyleObject;
}

const HeadingRecipe = ({ text, styles }: Props) => {
  return <Heading sx={styles}>{text}</Heading>;
};

export default HeadingRecipe;
