import { Button, Link, SystemStyleObject } from "@chakra-ui/react";

interface Props {
  label: string;
  styles: SystemStyleObject;
  href: string;
}

const ButtonCompounent = ({ label, styles, href }: Props) => {
  return (
    <Button as={Link} sx={styles} href={href}>
      {label}
    </Button>
  );
};

export default ButtonCompounent;
