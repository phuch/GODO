import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import moment from "moment";

import BaseText from "./Text";
import { HeaderText } from "./Text";
import SvgIcon from "./SvgIcon";
import { colors } from "react-native-elements";

class EventListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCategoryIcon = category => {
    switch (category) {
      case "Sports":
        return <SvgIcon name="Football" width={30} />;
      case "Music and Arts":
        return <SvgIcon name="Guitar" width={30} />;
      case "Crafts":
        return <SvgIcon name="Scissors" width={30} />;
      default:
        return <SvgIcon name="Mascot" width={30} />;
    }
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
        <View style={styles.icon}>{this.renderCategoryIcon(category)}</View>
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
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
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
