import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import colors from "../constants/colors";
import SvgIcon from "../components/SvgIcon";
import SearchBar from "../components/SearchBar";

const screenHeight = Dimensions.get("window").height;
const HEADER_HEIGHT_RATIO = 0.13;
const screenWidth = Dimensions.get("window").width;
const ICON_WIDTH_RATIO = 0.75;
export default (HomeHeader = props => {
  const {
    handleNavigation,
    isSearching,
    toggleSearchMode,
    handleSearch
  } = props;

  return (
    <View style={styles.container}>
      {isSearching ? (
        <View style={styles.contentSearchMode}>
          <SearchBar
            width={screenWidth * ICON_WIDTH_RATIO}
            style={styles.searchBar}
            onChangeText={term => handleSearch(term)}
            autoFocus={true}
            placeholder="Search for events"
          />
          <Button
            onPress={toggleSearchMode}
            title="Cancel"
            color={colors.darkGrey}
          />
        </View>
      ) : (
        <View style={styles.content}>
          <View>
            <SvgIcon name="GodoLogo" width={100} />
          </View>
          <View style={styles.rightIcons}>
            <TouchableOpacity
              style={styles.leftMargin}
              onPress={toggleSearchMode}
            >
              <Icon name="search" size={35} color={colors.darkGrey} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.leftMargin}
              onPress={() => handleNavigation("CreateEvent")}
            >
              <Icon name="plus" size={35} color={colors.darkGrey} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: screenHeight * HEADER_HEIGHT_RATIO,
    backgroundColor: colors.white
  },
  content: {
    paddingTop: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  contentSearchMode: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20
  },
  rightIcons: {
    flexDirection: "row"
  },
  leftMargin: {
    marginLeft: 10
  },
  searchBar: {
    marginTop: 0,
    marginBottom: 0
  }
});
