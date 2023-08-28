import { Button, Link, SystemStyleObject } from "@chakra-ui/react";

interface Props {
  text: string;
  styles: SystemStyleObject;
  href: string;
}

const ButtonCompounent = ({ text, styles, href }: Props) => {
  return (
    <Button as={Link} sx={styles} href={href}>
      {text}
    </Button>
  );
};

export default ButtonCompounent;
