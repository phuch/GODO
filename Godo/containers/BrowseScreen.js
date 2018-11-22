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
import { searchAllAction } from "../actions/browse-action";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class BrowseScreen extends React.Component {
  constructor(props) {
    super(props);
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
          />
        )}
        stickySectionHeadersEnabled={false}
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
    const { isSearching, searchAllAction } = this.props;

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
            onChangeText={text => searchAllAction(text)}
            placeholder="Search for events"
          />
        </View>
        <View style={{ flex: 1 }}>
          {isSearching
            ? this.renderResultEventList()
            : this.renderSectionList()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = store => {
  const { isSearching, events } = store.browseScreenState;
  return {
    isSearching,
    events
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ searchAllAction }, dispatch);
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
