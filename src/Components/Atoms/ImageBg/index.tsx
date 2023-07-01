import { Image } from "@chakra-ui/react";

interface Props {
  image?: string;
}

const ImageBg = (props: Props) => {
  return <Image src={props.image} opacity={0.4} />;
};

export default ImageBg;
