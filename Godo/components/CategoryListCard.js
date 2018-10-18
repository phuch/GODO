import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../constants/colors";
import PropTypes from "prop-types";

import { SectionHeaderText } from "../components/Text";

export default (CategoryListCard = props => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: props.backgroundColor }]}
    >
      <SectionHeaderText style={styles.title}>{props.title}</SectionHeaderText>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 75,
    borderRadius: 13,
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 5
  },
  title: {
    alignSelf: "center",
    color: colors.white
  }
});

CategoryListCard.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired
};
