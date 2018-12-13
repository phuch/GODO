import colors from "./colors";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default {
  textInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGrey,
    borderColor: colors.darkGrey,
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3
  },
  buttonContainer: {
    flex: 1,
    width: screenWidth,
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonTitle: {
    fontWeight: "700",
    color: colors.white
  }
};
