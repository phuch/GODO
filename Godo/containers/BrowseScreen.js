import React from "react";
import { StyleSheet, View, SectionList, Dimensions } from "react-native";
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

import { SectionHeaderText } from "../components/Text";

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
          <SectionHeaderText style={{ paddingLeft: 15 }}>
            {title}
          </SectionHeaderText>
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
    return (
      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        <EventList events={this.props.events} />
      </View>
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
            handleSearch={searchAllAction}
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
