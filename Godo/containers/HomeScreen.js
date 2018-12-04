import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Map from "../components/Map";
import EventList from "../components/EventList";
import HomeHeader from "../components/HomeHeader";
import { assignCardBackgroundColor } from "../util/colorUtils";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  fetchAllEvents,
  fetchNearbyEvents,
  searchEvents
} from "../actions/events-action";
import { getCurrentLocation } from "../actions/location-action";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearching: false
    };
  }

  componentDidMount() {
    this.props.getCurrentLocation();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.userLocation !== nextProps.userLocation) {
      this.props.fetchNearbyEvents(nextProps.userLocation);
    }
    return true;
  }

  handleNavigation = (routeName, params) => {
    const { navigation } = this.props;
    navigation.navigate(routeName, params);
  };

  refreshEventList = () => {
    this.props.fetchNearbyEvents(this.props.userLocation);
  };

  toggleSearch = () => {
    this.setState({ isSearching: !this.state.isSearching });
  };

  searchNearbyEvent = term => {
    this.props.searchEvents(term, { nearby: true });
  };

  renderListArea = () => {
    const { nearbyEvents, searchResult } = this.props;

    if (searchResult) {
      return this.renderEventList(searchResult, "keyword");
    } else if (nearbyEvents) {
      return this.renderEventList(nearbyEvents, "area");
    }
  };

  renderEventList = (eventList, msg) => {
    if (eventList) {
      return (
        <EventList
          events={eventList}
          backgroundColor={assignCardBackgroundColor}
          navigation={this.props.navigation}
          loading={this.props.loading}
          refreshEventList={this.refreshEventList}
        />
      );
    } else {
      return (
        <Text style={styles.noResultText}>
          {`No activities found nearby, please try another ${msg}`}
        </Text>
      );
    }
  };

  render() {
    const { errorMessage, userLocation, nearbyEvents } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <HomeHeader
            isSearching={this.state.isSearching}
            toggleSearchMode={this.toggleSearch}
            handleSearch={this.searchNearbyEvent}
            handleNavigation={this.handleNavigation}
          />
          {errorMessage ? (
            <Text>{errorMessage}</Text>
          ) : (
            <View style={{ padding: 5 }}>
              <Map userLocation={userLocation} nearbyEvents={nearbyEvents} />
            </View>
          )}
          {this.renderListArea()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "white",
    paddingHorizontal: 10
  },
  noResultText: {
    margin: 20,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center"
  }
});

const mapStateToProps = store => {
  const { userLocation, errorMessage } = store.location;
  const { nearbyEvents, errorEvents, loading, searchResult } = store.events;
  return {
    userLocation,
    searchResult,
    errorMessage,
    nearbyEvents,
    errorEvents,
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getCurrentLocation, searchEvents, fetchNearbyEvents },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
