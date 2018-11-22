import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { getLocations, searchLocations } from "../actions/location-action";
import AppHeader from "../components/AppHeader";
import LocationList from "../components/LocationList";
import SearchBar from "../components/SearchBar";
import colors from "../constants/colors";

class LocationPickerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: ""
    };

    this.searchLocationDebounced = _.debounce(this.searchLocation, 300);
  }

  componentDidMount() {
    this.props.getLocations();
  }

  searchLocation = term => {
    this.setState({ q: term });
    this.props.searchLocations(term);
  };

  render() {
    const { locations, searchResult, loading, navigation } = this.props;
    const onSelectLocation = navigation.getParam("onSelectLocation", null);

    return (
      <View style={styles.container}>
        <AppHeader
          hasBackButton={true}
          title="Location"
          navigation={navigation}
        />
        <View style={styles.body}>
          <View>
            <SearchBar
              style={{ marginBottom: 0 }}
              value={this.state.q}
              onChangeText={term => this.searchLocationDebounced(term)}
              placeholder="Search location"
            />
          </View>
          <LocationList
            locations={this.state.q ? searchResult : locations}
            loading={loading}
            onItemPress={onSelectLocation}
            navigation={navigation}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: "stretch"
  },
  body: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15
  }
});

const mapStateToProps = state => {
  const { locations, loading, searchResult } = state.location;
  return {
    loading,
    locations,
    searchResult
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getLocations, searchLocations }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationPickerModal);
