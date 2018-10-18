import React from "react";
import { StyleSheet } from "react-native";

import BaseText from "./BaseText";

export default (SectionHeaderText = props => {
  return (
    <BaseText {...props} style={[styles.sectionHeader, props.style]}>
      {props.children}
    </BaseText>
  );
});

const styles = StyleSheet.create({
  sectionHeader: {
    fontWeight: "bold"
  }
});
