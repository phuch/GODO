import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { DotIndicator } from "react-native-indicators";
import { assignCardBackgroundColor } from "../util/colorUtils";
import BaseText, { SectionHeaderText } from "./Text";
import EventListItem from "./EventListItem";
import colors from "../constants/colors";

class EventList extends React.Component {
  renderLoadingIndicator = () => {
    return (
      <View style={{ paddingTop: 40 }}>
        <DotIndicator
          count={3}
          size={10}
          color={colors.secondary}
          animationDuration={800}
        />
      </View>
    );
  };

  onRefreshEventList = () => {
    this.props.refreshEventList();
  };

  render() {
    const { events, navigation, loading, dataType } = this.props;

    let emptyMessage = "No activity found";
    if (dataType === "category") {
      emptyMessage = `${emptyMessage}, try another tag or try again later`;
    } else if (dataType === "search") {
      emptyMessage = `${emptyMessage}, try another keyword or try again later`;
    } else if (dataType === "nearby") {
      emptyMessage = `${emptyMessage}, try to move to other area`;
    } else {
      emptyMessage = `${emptyMessage}, try again later`;
    }

    if (loading) {
      return this.renderLoadingIndicator();
    }

    return (
      <View style={styles.container}>
        {this.props.showHeader && (
          <SectionHeaderText style={{ paddingLeft: 5 }}>
            Events
          </SectionHeaderText>
        )}
        <FlatList
          data={events}
          keyExtractor={event => event.id}
          renderItem={({ item }) => (
            <EventListItem
              event={item}
              navigation={navigation}
              backgroundColor={assignCardBackgroundColor(item.category)}
            />
          )}
          style={{ padding: 5 }}
          onRefresh={this.onRefresh}
          refreshing={false}
          ListEmptyComponent={
            <View>
              <BaseText style={styles.noResultText}>{emptyMessage}</BaseText>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  noResultText: {
    margin: 20,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center"
  }
});

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  showHeader: PropTypes.bool
};

export default EventList;
