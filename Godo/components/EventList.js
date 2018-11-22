import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { DotIndicator } from "react-native-indicators";
import { assignCardBackgroundColor } from "../util/colorUtils";
import { SectionHeaderText } from "./Text";
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

  render() {
    const { events, navigation, loading } = this.props;

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
          ListHeaderComponent={
            loading ? this.renderLoadingIndicator() : undefined
          }
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

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  showHeader: PropTypes.bool
};

export default EventList;
