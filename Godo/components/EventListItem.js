import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import moment from "moment";
import colors from "../constants/colors";
import { renderCategoryIcon } from "../util/iconsUtils";

import BaseText from "./Text";
import { HeaderText } from "./Text";

class EventListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  onPress = () => {
    const { event, onPress } = this.props;
    onPress("EventDetail", { event });
  };

  render() {
    const {
      event: { name, location, time, category },
      backgroundColor
    } = this.props;
    const formattedDate = moment(time).format("MMM D");
    const formattedTime = moment(time).format("k:mm");
    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: backgroundColor }]}
      >
        <View style={styles.icon}>{renderCategoryIcon(category)}</View>
        <View style={styles.info}>
          <View>
            <HeaderText style={{ color: colors.white }}>{name}</HeaderText>
            <BaseText style={styles.text}>{location.name}</BaseText>
          </View>

          <View>
            <BaseText style={styles.text}>{formattedTime}</BaseText>
            <BaseText style={styles.text}>{formattedDate}</BaseText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginRight: 10
  },
  info: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 13,
    color: "#FFF"
  }
});

export default EventListItem;
