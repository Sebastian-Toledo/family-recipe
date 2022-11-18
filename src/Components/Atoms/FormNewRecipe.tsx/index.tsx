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
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

const FormNewRecipe = () => {
  //const { imageURL, title, description, ingredients, method, author, id } =
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      backgroundImage="https://www.cocinatis.com/media/photologue/photos/recetas-de-calabaza-otono-faciles-saludable-cocinatis.jpg"
    >
      <Stack
        opacity={0.95}
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
        <Flex>
          <Flex direction={"column"} gap={5}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                w={"300px"}
                placeholder="Title:"
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl id="userName" isRequired>
              <FormLabel>Author</FormLabel>
              <Input
                placeholder="Author:"
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
          </Flex>
          <Flex>
            <HStack spacing={4}>
              {["sm", "md", "lg"].map((size) => (
                <Tag
                  size={size}
                  key={size}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="green"
                >
                  <TagLabel>Green</TagLabel>
                  <TagCloseButton />
                </Tag>
              ))}
            </HStack>
          </Flex>
        </Flex>

        <FormControl
          id="userName"
          display={"flex"}
          justifyContent={"space-evenly"}
        >
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
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Description:" w={"700px"} h={"100px"} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Method</FormLabel>
              <Textarea placeholder="Method:" w={"700px"} h={"200px"} />
            </FormControl>
          </Flex>
        </FormControl>

        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
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

export default FormNewRecipe;
