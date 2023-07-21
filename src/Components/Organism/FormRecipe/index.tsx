import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Textarea,
  Center,
} from "@chakra-ui/react";
import { useState, FormEvent, ChangeEvent } from "react";
import ImageInput from "../../Atoms/ImageInput";
import IngredientInput from "../../Atoms/IngredientInput";

const FormRecipe = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [method, setMethod] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleChangeTitle = (e: FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleChangeAuthor = (e: FormEvent<HTMLInputElement>) => {
    setAuthor(e.currentTarget.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleChangeMethod = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMethod(e.target.value);
  };

  const handleChangeIngredients = (e: FormEvent<HTMLInputElement>) => {
    setMethod(e.currentTarget.value);
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} opacity={0.95}>
      <Stack
        spacing={4}
        w="4xl"
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1}>Create New Recipe</Heading>
        <FormControl display="flex" gap="15px">
          <FormControl isRequired>
            <ImageInput />
          </FormControl>
          <Flex direction={"column"} gap={5}>
            <FormControl isRequired>
              <Input
                w={"600px"}
                placeholder="Title"
                onChange={handleChangeTitle}
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl id="userName" isRequired>
              <Input
                w={"600px"}
                placeholder="Author"
                onChange={handleChangeAuthor}
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl>
              <Textarea
                placeholder="Description"
                onChange={handleChangeDescription}
                w={"600px"}
                h={"100px"}
              />
            </FormControl>
          </Flex>
        </FormControl>
        <Center>
          <FormControl
            isRequired
            display="flex"
            flexDirection={"column"}
            flexWrap={"wrap"}
            alignContent={"space-around"}
          >
            <Textarea
              placeholder="Method"
              onChange={handleChangeMethod}
              w={"700px"}
              h={"175px"}
            />
          </FormControl>
        </Center>
        <IngredientInput
          onChangeIngredients={(ingredients) => {
            setIngredients(ingredients);
          }}
        />
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"orange.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "orange.500",
            }}
            //onClick={}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default FormRecipe;
