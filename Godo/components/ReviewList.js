import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Feather";
import colors from "../constants/colors";

import ReviewListItem from "./ReviewListItem";
import { SectionHeaderText } from "./Text";

const ReviewList = props => {
  const { data, scrollEnabled, showAddButton } = props;
  return (
    <View>
      <View style={styles.header}>
        <SectionHeaderText style={{ paddingLeft: 5 }}>
          Reviews
        </SectionHeaderText>
        { showAddButton && (
          <TouchableOpacity>
            <Icon name="plus" size={25} color={colors.darkGrey} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={data}
        keyExtractor={review => review.id}
        renderItem={({ item }) => {
          return <ReviewListItem {...item} />;
        }}
        scrollEnabled={scrollEnabled}
        style={{ padding: 5 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

ReviewList.propTypes = {
  data: PropTypes.array.isRequired,
  showAddButton: PropTypes.bool,
  scrollEnabled: PropTypes.bool
};

export default ReviewList;
