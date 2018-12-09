import React from "react";
import { StyleSheet, View, SectionList, Dimensions, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import categories from "../fixtures/categories.json";
import { assignCardBackgroundColor } from "../util/colorUtils";
import SvgIcon from "../components/SvgIcon";

import CategoryList from "../components/CategoryList";
import SearchBar from "../components/SearchBar";
import EventList from "../components/EventList";

import colors from "../constants/colors";
import { fetchAllEvents, searchEvents } from "../actions/events-action";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class BrowseScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuerry: ""
    };
  }

  componentDidMount() {
    this.props.fetchAllEvents();
  }

  renderSectionList = () => {
    return (
      <SectionList
        sections={categories}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        renderItem={({ item, index, section }) => (
          <CategoryList
            category={item}
            backgroundColor={assignCardBackgroundColor(section.title)}
            onSelectCategory={this.selectCategory}
          />
        )}
        stickySectionHeadersEnabled={false}
      />
    );
  };

  doSearch = querry => {
    this.setState({ searchQuerry: querry });
    this.props.searchEvents(querry, {});
  };

  renderResultEventList = () => {
    const { searchResult } = this.props;
    return (
      <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}>
        <EventList
          events={searchResult}
          backgroundColor={assignCardBackgroundColor}
          navigation={this.props.navigation}
          dataType={"search"}
        />
      </KeyboardAwareScrollView>
    );
  };

  handleNavigation = (routeName, params) => {
    const { navigation } = this.props;
    navigation.navigate(routeName, params);
  };

  selectCategory = item => {
    this.handleNavigation("EventListScreen", { category: item });
  };

  render() {
    const screenWidth = Dimensions.get("window").width;
    const ICON_WIDTH_RATIO = 0.6;

    return (
      <View style={styles.container}>
        <View style={{ alignSelf: "center" }}>
          <SvgIcon
            name="LookingFor"
            width={screenWidth * ICON_WIDTH_RATIO}
            height={80}
          />
          <SearchBar
            width={screenWidth * ICON_WIDTH_RATIO}
            value={this.state.searchQuerry}
            onChangeText={text => this.doSearch(text)}
            placeholder="Search for events by names, tags, etc."
          />
        </View>
        <View style={{ flex: 1 }}>
          {this.state.searchQuerry
            ? this.renderResultEventList()
            : this.renderSectionList()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = store => {
  const { events, searchResult } = store.events;
  return {
    events,
    searchResult
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ searchEvents, fetchAllEvents }, dispatch);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "stretch",
    paddingTop: 90
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
)(BrowseScreen);
