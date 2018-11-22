import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import AppHeader from "../components/AppHeader";
import colors from "../constants/colors";

class DateTimePickerModal extends React.Component {
  dimissModal = () => {
    this.props.navigation.pop();
  };

  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.dimissModal;
  };

  render() {
    return (
      <View style={styles.container}>
        <AppHeader
          hasBackButton={true}
          title="Date and Time"
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: "stretch"
  }
});

export default DateTimePickerModal;
