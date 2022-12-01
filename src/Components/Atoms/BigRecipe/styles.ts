const bigRecipeStyles = {
  mainContainerFlex: {
    background: "#FDEBD0",
    padding: "md",
    maxH: "300px",
    borderRadius: "lg",
    overflow: "hidden",
    width: "1000px",
    justifyItems: "center",
  },
  imageContainer: {
    boxSize: "300px",
  },
  mainInputContainer: {
    p: "2",
    flex: "1",
    flexDirection: "column",
  },
  informationContainer: {
    gap: "2",
    textOverflow: "ellipsis",
    flexDirection: "column",
    alignItems: "center",
    bg: "#FDEBD0",
    overflow: "hidden",
    mb: "4",
  },
  title: {
    display: "flex",
    as: "h6",
    m: "0",
    size: "lg",
  },
  author: {
    fontSize: "md",
    m: "0",
    pt: "0.5",
    pb: "0.5",
  },
  description: {
    fontSize: "xs",
    height: "2.5em",
    mb: "2",
    textAlign: "center",
    overflow: "ellipsis",
  },
  divider: {
    alignSelf: "center",
    orientation: "horizontal",
    bg: "black",
    height: "2px",
    width: "60%",
  },
  betweenContainer: {
    bg: "#FDEBD0",
    p: "2",
    mt: "4",
    flex: "1",
    justifyItems: "",
    alignContent: "center",
  },
  flexContainerIngredients: {
    bg: "#FDEBD0",
    flexDirection: "column",
    alignItems: "center",
  },
  ingredientsTitle: {
    as: "h6",
    mb: "4",
    textAlign: "center",
    size: "md",
  },
  ingredients: {
    fontSize: "xs",
    textAlign: "center",
    m: "0",
    key: "index",
    overflow: "hidden",
  },
  flexContainerMethod: {
    bg: "#FDEBD0",
    flexDirection: "column",
    gap: "2",
  },
  methodTitle: {
    as: "h6",
    mb: "4",
    textAlign: "center",
    size: "md",
  },
  method: {
    fontSize: "xs",
    textAlign: "center",
    m: "0",
    overflow: "hidden",
  },
};

export default bigRecipeStyles;
