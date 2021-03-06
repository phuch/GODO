import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/EvilIcons";
import colors from "../constants/colors";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const HEADER_HEIGHT_RATIO = 0.1;

const AppHeader = props => {
  const { title, navigation, hasBackButton, rightIcons } = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (props.onNavigateBack) {
              props.onNavigateBack();
            }
            navigation.goBack(null);
          }}
        >
          {hasBackButton && (
            <Icon name="chevron-left" size={40} color={colors.darkGrey} />
          )}
        </TouchableOpacity>
        <Text style={styles.title}> {title} </Text>
        <View style={styles.headerRight}>{rightIcons}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight * HEADER_HEIGHT_RATIO,
    width: screenWidth
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white
  },
  title: {
    color: colors.darkGrey,
    textAlign: "center",
    marginBottom: 5,
    fontSize: 18,
    flex: 2
  },
  backButton: {
    flex: 1
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end"
  }
});

AppHeader.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.object,
  hasBackButton: PropTypes.bool,
  rightIcons: PropTypes.oneOfType([PropTypes.element, PropTypes.bool])
};

export default AppHeader;
