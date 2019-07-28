import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

import BaseText from "./BaseText";

export default (LinkText = props => {
  return (
    <BaseText {...props} style={[styles.link, props.style]}>
      {props.children}
    </BaseText>
  );
});

const styles = StyleSheet.create({
  link: {
    color: colors.secondary
  }
});
