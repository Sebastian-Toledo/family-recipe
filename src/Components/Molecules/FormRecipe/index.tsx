import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Image,
  Textarea,
  Center,
} from "@chakra-ui/react";
import IngredientInput from "../../Atoms/IngredientInput";

const FormRecipe = () => {
  //const { imageURL, title, description, ingredients, method, author, id } =
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} opacity={0.95}>
      <Stack
        spacing={4}
        w={"full"}
        maxW="1200px"
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Create New Recipe
        </Heading>
        <FormControl id="userName" display={"flex"}>
          <FormControl isRequired>
            <FormLabel>Image of Recipe</FormLabel>
            <Stack direction={["column"]} spacing={6}>
              <Image
                boxSize="300px"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
              ></Image>
              <Button w="300px">Change Image</Button>
            </Stack>
          </FormControl>
          <Flex direction={"column"} gap={5}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                w={"600px"}
                placeholder="Title:"
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl id="userName" isRequired>
              <FormLabel>Author</FormLabel>
              <Input
                w={"600px"}
                placeholder="Author:"
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Description:" w={"600px"} h={"100px"} />
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
            <FormLabel>Method</FormLabel>
            <Textarea placeholder="Method:" w={"700px"} h={"175px"} />
          </FormControl>
        </Center>
        <IngredientInput />
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"orange.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "orange.500",
            }}
          >
            Cancel
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default FormRecipe;
