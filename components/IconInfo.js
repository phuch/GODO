import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import SvgIcon from "../components/SvgIcon";
import colors from "../constants/colors";

const IconInfo = props => {
  const { iconName, title, onPress } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <SvgIcon name={iconName} width={30} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginRight: 10
  },
  title: {
    color: colors.darkGrey
  }
});

export default IconInfo;
