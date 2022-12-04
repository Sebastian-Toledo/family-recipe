import { Box, Image, Input } from "@chakra-ui/react";
import { useState } from "react";
import Icons from "../../../assets/images/image-placeholder.svg";

const ImageInput = () => {
  const [imageUrl, setImageUrl] = useState("");

  const onChangePicture = (e: any) => {
    const image = e.target?.files[0];
    if (!image) {
      return;
    }
    // const reader = new FileReader();
    // reader.addEventListener("load", () => {
    //   setImgData(image);
    // });
    const currentImageURL = URL.createObjectURL(image);
    console.log(currentImageURL);
    setImageUrl(currentImageURL);
    // reader.readAsDataURL(image);
  };

  return (
    <Box _hover={{ opacity: "0.5", cursor: "pointer" }} onClick={() => {}}>
      <Input type="file" onChange={onChangePicture} />
      <Image src={!!imageUrl ? imageUrl : Icons} />
    </Box>
  );
};

export default ImageInput;
