import { ComponentStyleConfig, Flex } from "@chakra-ui/react";

const cardRecipe: ComponentStyleConfig = {
  baseStyle: {
    mainContainer: {
      background: "#FDEBD0",
      padding: "md",
      maxH: "300px",
      borderRadius: "lg",
      overflow: "hidden",
      width: "1000px",
      justifyItems: "center",
      display: "flex",
    },
    imageContainer: { display: "flex" },
    image: {
      boxSize: "300px",
    },
    informationContainer: {
      display: "flex",
      p: "6",
      flex: 1,
      flexDirection: "column",
    },
    centerContainer: {
      display: "flex",
      gap: 2,
      flexDirection: "column",
      alignItems: "center",
      bg: "#FDEBD0",
      overflow: "ellipsis",
      pb: 1,
    },
    title: {
      as: "h6",
      m: 0,
      size: "lg",
    },
    author: {
      fontSize: "md",
      m: 0,
      pt: 0.5,
      pb: 0.5,
    },
    description: {
      fontSize: "xs",
      m: 0,
      textAlign: "center",
      overflow: "ellipsis",
    },
    divider: {
      orientation: "horizontal",
      bg: "black",
      height: "1px",
      width: "80%",
    },
    betweenContainer: {
      display: "flex",
      bg: "#FDEBD0",
      p: 2,
      flex: 1,
      justifyContent: "space-between",
      alignContent: "center",
    },
    leftContainer: {
      display: "flex",
      bg: "#FDEBD0",
      flexDirection: "column",
      gap: 2,
      alignItems: "center",
    },
    ingredientsHeading: {
      as: "h6",
      m: 0,
      textAlign: "center",
      size: "md",
    },
    ingredients: {
      fontSize: "xs",
      textAlign: "center",
      m: 0,
      key: "index",
      overflow: "hidden",
    },
    rightContainer: {
      display: "flex",
      bg: "#FDEBD0",
      flexDirection: "column",
      gap: 2,
    },
    methodContainer: {
      as: "h6",
      m: 0,
      textAlign: "center",
      size: "md",
    },
    method: {
      fontSize: "xs",
      textAlign: "center",
      m: 0,
      overflow: "hidden",
    },
  },
};

export default cardRecipe;
