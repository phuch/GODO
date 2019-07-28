import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";
import PropTypes from "prop-types";

import BaseText from "./Text";
import { HeaderText, LinkText } from "./Text";
import SvgIcon from "./SvgIcon";

const ReviewListItem = props => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.reviewLeft}>
        <View style={styles.header}>
          <HeaderText>{props.title}</HeaderText>
          <BaseText> by </BaseText>
          <LinkText numberOfLines={1} style={{ flexShrink: 1 }}>
            {props.author}
          </LinkText>
        </View>
        <View styles={styles.content}>
          <BaseText numberOfLines={2}>
            {props.description}
          </BaseText>
        </View>
      </View>
      <View style={styles.reviewRight}>
        <SvgIcon name="ReviewStar" size={30} />
        <BaseText style={{ paddingTop: 4 }}>{`${props.rating} / 5`}</BaseText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 10,
    marginBottom: 10,
    backgroundColor: colors.lightGrey,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    flexDirection: "row",
    alignItems: "center"
  },
  reviewLeft: {
    flex: 1
  },
  header: {
    flex: 1,
    top: -5,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  reviewRight: {
    paddingLeft: 15,
    alignItems: "center"
  }
});

ReviewListItem.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
}

export default ReviewListItem;
