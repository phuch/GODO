import React from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";
import BaseText, { SectionHeaderText } from "./Text";

import colors from "../constants/colors";

class EventMemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };
  }
  renderSectionHeader = ({ section }) => {
    console.log(section);
    if (section.title === "Attendees") {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center"
          }}
        >
          <SectionHeaderText style={{ fontSize: 15 }}>
            {section.title}
          </SectionHeaderText>
          <SectionHeaderText style={{ fontSize: 15 }}>{`${
            this.props.event.attendees.length
          }/${this.props.event.slots}`}</SectionHeaderText>
        </View>
      );
    }

    return (
      <View style={{ justifyContent: "center" }}>
        <SectionHeaderText style={{ fontSize: 15 }}>
          {section.title}
        </SectionHeaderText>
      </View>
    );
  };

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 5
        }}
      >
        <View>
          <Avatar
            medium
            rounded
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
            }}
            activeOpacity={0.7}
            avatarStyle={{
              borderWidth: 4,
              borderColor: colors.secondary,
              borderTopLeftRadius: 1
            }}
          />
        </View>
        <View>
          <BaseText style={{ paddingLeft: 10, fontSize: 15 }}>
            {item.fullName}
          </BaseText>
        </View>
      </View>
    );
  };

  render() {
    const { users, navigation, event } = this.props;

    if (!users || !event) return null;

    const host = {
      title: "Host",
      data: [this.props.event.publisher]
    };

    const participants = {
      title: "Attendees",
      data: users
    };

    let data = [host];
    if (participants.data.length > 0) {
      data.push(participants);
    }

    console.log(data);
    return (
      <View style={styles.container}>
        <SectionList
          sections={data}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          stickySectionHeadersEnabled={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default EventMemberList;
