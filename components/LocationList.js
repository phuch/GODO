import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import PropTypes from "prop-types";
import { BallIndicator } from "react-native-indicators";
import BaseText, { HeaderText } from "./Text";
import colors from "../constants/colors";

class LocationList extends React.Component {
  renderLoadingIndicator = () => {
    return (
      <View style={{ paddingTop: 40 }}>
        <BallIndicator
          size={30}
          color={colors.darkGrey}
          animationDuration={800}
        />
      </View>
    );
  };

  renderItem = location => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          this.props.onItemPress(location);
          this.props.navigation.pop();
        }}
      >
        <HeaderText style={{ paddingBottom: 5 }}>{location.name}</HeaderText>
        <BaseText>{location.address}</BaseText>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => {
    return <View style={{ height: 1, backgroundColor: colors.darkGrey }} />;
  };

  renderEmptyList = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 40
        }}
      >
        <HeaderText>No result found, please try another location.</HeaderText>
      </View>
    );
  };

  render() {
    const { locations, loading } = this.props;
    return (
      <FlatList
        data={!loading && locations}
        keyExtractor={location => location.id}
        renderItem={({ item }) => this.renderItem(item)}
        ListHeaderComponent={loading && this.renderLoadingIndicator}
        ItemSeparatorComponent={this.renderSeparator}
        ListEmptyComponent={!loading && this.renderEmptyList}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 20
  }
});

LocationList.propTypes = {
  locations: PropTypes.array.isRequired,
  loading: PropTypes.bool
};

export default LocationList;
