import {
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { KeyboardEvent, useState } from "react";

const IngredientInput = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [keyBoardInput, setKeyBoardInput] = useState("");
  //   const { value } = e.target;

  const onKeyDown = (e: KeyboardEvent) => {
    const trimmedInput = keyBoardInput.trim();
    if (
      e.key === "Enter" &&
      trimmedInput.length &&
      !ingredients.includes(trimmedInput)
    ) {
      e.preventDefault();
      setIngredients((prevState) => [...prevState, trimmedInput]);
      setKeyBoardInput("");
      return;
    }
  };
  //usereff

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyBoardInput(e.target.value);
  };

  const deleteTag = (key: number) => {
    setIngredients((prevState: any) =>
      prevState.filter((ingredient: string, i: number) => i !== key)
    );
  };

  return (
    <Flex direction={"column"}>
      <FormControl isRequired mb={"mm"}>
        <FormLabel>Ingredient</FormLabel>
        <HStack spacing={0} w={"800"} h={"50"} flexWrap={"wrap"}>
          {ingredients.map((ingredient, key) => (
            <Tag
              size="md"
              key={key}
              borderRadius="full"
              variant="solid"
              colorScheme="orange"
            >
              <TagLabel>{ingredient}</TagLabel>
              <TagCloseButton onClick={() => deleteTag(key)} />
            </Tag>
          ))}
        </HStack>
        <Input
          onChange={handleChangeInput}
          onKeyDown={onKeyDown}
          w="600px"
          placeholder="Insert one ingredient and press enter:"
          _placeholder={{ color: "gray.400" }}
          type="text"
        />
      </FormControl>
    </Flex>
  );
};

export default IngredientInput;
