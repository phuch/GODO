import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { assignCardBackgroundColor } from "../util/colorUtils";

import { SectionHeaderText } from "./Text";
import EventListItem from "./EventListItem";

const EventList = props => {
  const { events } = props;

  return (
    <View style={styles.container}>
      {props.showHeader && (
        <SectionHeaderText style={{ paddingLeft: 5 }}>Events</SectionHeaderText>
      )}
      <FlatList
        data={events}
        keyExtractor={event => `${event.id}`}
        renderItem={({ item }) => (
          <EventListItem
            event={item}
            backgroundColor={assignCardBackgroundColor(item.category)}
          />
        )}
        style={{ padding: 5 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  showHeader: PropTypes.bool
};

export default EventList;
