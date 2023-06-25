import {
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  FormControl,
  Input,
  Center,
} from "@chakra-ui/react";
import { KeyboardEvent, useState } from "react";

interface Props {
  onChangeIngredients: (ingredients: string[]) => void;
}

const IngredientInput = (props: Props) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [keyBoardInput, setKeyBoardInput] = useState("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyBoardInput(e.target.value);
  };

  const addIngredient = (e: KeyboardEvent) => {
    const trimmedInput = keyBoardInput.trim();

    if (
      e.key === "Enter" &&
      trimmedInput.length &&
      !ingredients.includes(trimmedInput)
    ) {
      setIngredients((prevState) => {
        const newIngredient = [...prevState, trimmedInput];

        props.onChangeIngredients(newIngredient);
        return newIngredient;
      });
      setKeyBoardInput("");

      return;
    }
  };

  const removeIngredient = (key: number) => {
    setIngredients((prevState) => {
      const currentIngredient = prevState.filter(
        (ingredient: string, i: number) => i !== key
      );

      props.onChangeIngredients(currentIngredient);
      return currentIngredient;
    });
  };

  return (
    <Center>
      <Flex direction={"column"}>
        <FormControl isRequired mb={"mm"}>
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
                <TagCloseButton onClick={() => removeIngredient(key)} />
              </Tag>
            ))}
          </HStack>
          <Input
            onChange={handleChangeInput}
            onKeyDown={addIngredient}
            w="700px"
            placeholder="Insert one ingredient and press enter:"
            _placeholder={{ color: "gray.400" }}
            type="text"
            value={keyBoardInput}
          />
        </FormControl>
      </Flex>
    </Center>
  );
};

export default IngredientInput;
