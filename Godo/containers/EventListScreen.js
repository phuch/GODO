import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { assignCardBackgroundColor } from "../util/colorUtils";
import AppHeader from "../components/AppHeader";
import SearchBar from "../components/SearchBar";

import EventList from "../components/EventList";

import colors from "../constants/colors";

class EventListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false
    };
  }

  renderEventList = category => {
    const data = this.props.events.filter(
      event =>
        event.tags.includes(category) ||
        event.name.toLowerCase().includes(category)
    );
    return (
      <EventList
        events={data}
        backgroundColor={assignCardBackgroundColor}
        navigation={this.props.navigation}
        loading={this.props.loading}
        refreshEventList={this.refreshEventList}
        dataType={this.state.isSearching ? "search" : "category"}
      />
    );
  };

  renderResultEventList = () => {
    const { events } = this.props;
    return events.length ? (
      <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}>
        <EventList
          events={this.props.events}
          backgroundColor={assignCardBackgroundColor}
          navigation={this.props.navigation}
        />
      </KeyboardAwareScrollView>
    ) : (
      <Text style={styles.noResultText}>
        No activities found, please try another keyword
      </Text>
    );
  };

  render() {
    const category = this.props.navigation.getParam("category", null);

    return (
      <View style={styles.container}>
        <AppHeader
          hasBackButton={true}
          title={category}
          navigation={this.props.navigation}
        />
        <View style={styles.content}>
          <SearchBar />
          {this.renderEventList(category.toLowerCase())}
        </View>
      </View>
    );
  }
}

const mapStateToProps = store => {
  const { events, loading } = store.events;
  return { events, loading };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "stretch"
  },
  content: {
    paddingHorizontal: 15,
    flex: 1
  },
  sectionTitle: {
    fontWeight: "bold",
    color: colors.darkGrey,
    marginLeft: 15
  },
  noResultText: {
    margin: 20,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListScreen);
