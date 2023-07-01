const bigRecipeStyles = {
  mainContainerFlex: {
    // background: "#FDEBD0",
    // padding: "md",
    // borderRadius: "lg",
    // overflow: "hidden",
    // justifyItems: "center",
    maxH: "100vh",
    maxW: "100vw",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  imageContainer: {},
  mainInputContainer: {
    p: "2",
    flex: "1",
    flexDirection: "column",
  },
  informationContainer: {
    gap: "2",
    textOverflow: "ellipsis",
    flexDirection: "column",
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
    mb: "2",
    overflow: "ellipsis",
  },
  divider: {
    orientation: "horizontal",
    bg: "black",
    height: "2px",
  },
  betweenContainer: {
    p: "2",
    mt: "4",
    flex: "1",
    justifyItems: "",
  },
  flexContainerIngredients: {
    flexDirection: "column",
  },
  ingredientsTitle: {
    as: "h6",
    mb: "4",
    size: "md",
  },
  ingredients: {
    fontSize: "xs",
    m: "0",
    key: "index",
    overflow: "hidden",
  },
  flexContainerMethod: {
    flexDirection: "column",
    gap: "2",
  },
  methodTitle: {
    as: "h6",
    mb: "4",
    size: "md",
  },
  method: {
    fontSize: "xs",
    m: "0",
    overflow: "hidden",
  },
};

export default bigRecipeStyles;
