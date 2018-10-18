import React from "react";
import { StyleSheet, View, SectionList, Dimensions } from "react-native";
import { connect } from "react-redux";
import categories from "../fixtures/categories.json";
import { assignCardBackgroundColor } from "../util/colorUtils";

import SvgIcon from "../components/SvgIcon";
import { SectionHeaderText } from "../components/Text";
import CategoryList from "../components/CategoryList";
import SearchBar from "../components/SearchBar";
import EventList from "../components/EventList";

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
      <View style={{ paddingHorizontal: 15 }}>
        <EventList events={this.props.events} />
      </View>
    );
  };

  render() {
    const { isSearching } = this.props;

    const screenWidth = Dimensions.get("window").width;
    const ICON_WIDTH_RATIO = 0.6;

    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <SvgIcon
            name="LookingFor"
            width={screenWidth * ICON_WIDTH_RATIO}
            height={80}
          />
          <SearchBar width={screenWidth * ICON_WIDTH_RATIO} />
        </View>
        <View>
          {isSearching
            ? this.renderResultEventList()
            : this.renderSectionList()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ events }) => {
  return {
    isSearching: events.isSearching,
    events: events.events
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "stretch",
    paddingTop: 90
  }
});

export default connect(mapStateToProps)(BrowseScreen);
