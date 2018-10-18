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
          <HeaderText>Lorem ipsum dolor sit amet</HeaderText>
          <BaseText> by </BaseText>
          <LinkText numberOfLines={1} style={{ flexShrink: 1 }}>
            John Appleseed
          </LinkText>
        </View>
        <View styles={styles.content}>
          <BaseText numberOfLines={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            tincidunt tincidunt ex, a rhoncus ligula feugiat fermentum. Sed vel
            lorem aliquet, sagittis justo sollicitudin, tincidunt quam.
            Phasellus vel leo nec neque rhoncus congue. Phasellus a tincidunt
            enim. Aenean auctor mauris rhoncus, elementum orci nec, condimentum
            sem. Nunc et tristique sapien. Suspendisse turpis ex, luctus eget
            tempor sit amet, tempus et lorem. Etiam at libero volutpat, aliquam
            quam vitae, vehicula ligula. Sed vehicula feugiat lorem, tincidunt
            cursus lacus sollicitudin eget. Sed efficitur nulla in ex malesuada,
            ac ornare massa bibendum. Fusce ultricies sollicitudin diam ac
            tincidunt.
          </BaseText>
        </View>
      </View>
      <View style={styles.reviewRight}>
        <SvgIcon name="ReviewStar" size={30} />
        <BaseText style={{ paddingTop: 4 }}>4 / 5</BaseText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    flexDirection: "row",
    alignItems: "center"
  },
  reviewLeft: {
    flex: 1
  },
  header: {
    flex: 1,
    top: -4,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  reviewRight: {
    paddingHorizontal: 20,
    alignItems: "center"
  }
});

export default ReviewListItem;
