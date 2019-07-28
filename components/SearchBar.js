import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/EvilIcons";
import colors from "../constants/colors";
import basicStyles from "../constants/basicStyles";

class SearchBar extends React.Component {
  render() {
    const { style, autoFocus } = this.props;
    return (
      <View style={[basicStyles.textInput, { width: this.props.width }, style]}>
        <Icon name="search" color={colors.darkGrey} size={24} />
        <TextInput
          value={this.props.value}
          style={styles.textInput}
          clearButtonMode="while-editing"
          autoFocus={autoFocus}
          underlineColorAndroid="transparent"
          placeholder={this.props.placeholder || "Search for nearby activity"}
          onChangeText={this.props.onChangeText}
          multiline={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGrey,
    borderColor: colors.darkGrey,
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3
  },
  textInput: {
    flex: 1,
    color: colors.darkGrey
  }
});

SearchBar.propTypes = {
  width: PropTypes.number,
  autoFocus: PropTypes.bool,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string
};

SearchBar.defaultProps = {
  autoFocus: false
};

export default SearchBar;
