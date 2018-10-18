import React from "react";
import { StyleSheet } from "react-native";

import BaseText from "./BaseText";

export default (HeaderText = props => {
  return (
    <BaseText {...props} style={[styles.header, props.style]}>
      {props.children}
    </BaseText>
  );
});

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "400"
  }
});
