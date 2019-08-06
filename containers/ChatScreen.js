import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import colors from "../constants/colors";
import basicStyles from "../constants/basicStyles";
import AppHeader from "../components/AppHeader";

class ChatScreen extends Component {
  render() {
    const title = this.props.navigation.getParam("title", null);
    return (
      <View style={styles.container}>
        <AppHeader
          hasBackButton
          title={title}
          navigation={this.props.navigation}
        />
        <ScrollView style={{ flex: 1, height: "100%" }} />

        <View style={[styles.footer, basicStyles.textInput]}>
          <TextInput
            style={styles.textInput}
            placeholder="Your messages..."
            clearButtonMode="while-editing"
            underlineColorAndroid="transparent"
            multiline={true}
            blurOnSubmit={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: colors.white
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    marginHorizontal: 15
  },
  textInput: {
    flex: 1,
    color: colors.darkGrey,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  }
});

export default ChatScreen;
