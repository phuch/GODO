import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import colors from "../constants/colors";

import AppHeader from "../components/AppHeader";
import ReviewListItem from "../components/ReviewListItem";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <AppHeader
          rightIcons={
            <TouchableOpacity>
              <Icon name="pencil" size={30} color={colors.darkGrey} />
            </TouchableOpacity>
          }
        />
        <ReviewListItem />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center"
  }
});

export default ProfileScreen;
