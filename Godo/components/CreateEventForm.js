import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import BaseText from "./Text";
import Icon from "react-native-vector-icons/EvilIcons";
import colors from "../constants/colors";

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      seletedDateTime: null,
      selectedLocation: null,
      event: null
    };
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({
      seletedDateTime: date,
      event: { ...this.state.event, time: moment(date).unix() }
    });
    this.props.onChangeData(this.state.event);
    this._hideDateTimePicker();
  };

  _handleLocationPicked = location => {
    this.setState({
      selectedLocation: location,
      event: { ...this.state.event, location: `/locations/${location.id}` }
    });
    this.props.onChangeData(this.state.event);
  };

  _handleChangeName = text => {
    this.setState({
      event: { ...this.state.event, name: text }
    });
    this.props.onChangeData(this.state.event);
  };

  _handleChangePeople = number => {
    this.setState({
      event: { ...this.state.event, slots: number }
    });
    this.props.onChangeData(this.state.event);
  };

  _handleChangeFee = number => {
    this.setState({
      event: { ...this.state.event, fee: number }
    });
    this.props.onChangeData(this.state.event);
  };

  _handleChangeCategory = value => {
    this.setState({
      event: { ...this.state.event, category: value }
    });
    this.props.onChangeData(this.state.event);
  };

  _handleChangeDescription = desc => {
    this.setState({
      event: { ...this.state.event, description: desc }
    });
    this.props.onChangeData(this.state.event);
  };

  _handleChangeTags = tags => {
    this.setState({
      event: { ...this.state.event, tags: [tags] }
    });
    this.props.onChangeData(this.state.event);
  };

  _renderDateTimePicker = () => {
    return (
      <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this._handleDatePicked}
        onCancel={this._hideDateTimePicker}
        mode="datetime"
      />
    );
  };

  render() {
    const { category } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <BaseText style={styles.inputLabel}>Event's name</BaseText>
          <TextInput
            style={styles.textInput}
            onChangeText={this._handleChangeName}
          />
        </View>

        <View>
          <TouchableOpacity
            style={[styles.inputContainer, styles.modalButton]}
            onPress={() =>
              this.props.navigate("LocationPicker", {
                onSelectLocation: this._handleLocationPicked
              })
            }
          >
            <View>
              {this.state.selectedLocation ? (
                <View>
                  <BaseText style={styles.smallLabel}>Location</BaseText>
                  <BaseText style={{ fontSize: 17, marginBottom: 7 }}>
                    {this.state.selectedLocation.name}
                  </BaseText>
                </View>
              ) : (
                <BaseText style={styles.inputLabel}>Add Location</BaseText>
              )}
            </View>
            <View>
              <Icon
                name="chevron-right"
                size={35}
                color={colors.darkGrey}
                style={{ marginBottom: 10, marginTop: 20 }}
              />
            </View>
            {this._renderDateTimePicker()}
          </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.inputContainer, styles.modalButton]}
          onPress={this._showDateTimePicker}
        >
          <View>
            {this.state.seletedDateTime ? (
              <View>
                <BaseText style={styles.smallLabel}>Date and Time</BaseText>
                <BaseText style={{ fontSize: 17, marginBottom: 7 }}>
                  {moment(this.state.date).format("MMM D YYYY, h:mm A")}
                </BaseText>
              </View>
            ) : (
              <BaseText style={styles.inputLabel}>Date and Time</BaseText>
            )}
          </View>
          <View>
            <Icon
              name="chevron-right"
              size={35}
              color={colors.darkGrey}
              style={{ marginBottom: 10, marginTop: 20 }}
            />
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 20 }]}>
            <BaseText style={styles.inputLabel}>People</BaseText>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              onChangeText={this._handleChangePeople}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <BaseText style={styles.inputLabel}>Fee</BaseText>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              onChangeText={this._handleChangeFee}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.dropDownArea}>
            <Dropdown
              label="Category"
              data={category}
              baseColor={colors.darkGrey}
              itemColor={colors.darkGrey}
              dropdownPosition={0}
              itemTextStyle={styles.pickerText}
              labelTextStyle={styles.pickerTextLabel}
              baseTextStyle={styles.pickerText}
              onChangeText={this._handleChangeCategory}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <BaseText style={styles.inputLabel}>Description</BaseText>
          <TextInput
            style={styles.textInput}
            multiline={true}
            onChangeText={this._handleChangeDescription}
          />
        </View>

        <View style={styles.inputContainer}>
          <BaseText style={styles.inputLabel}>Tags</BaseText>
          <TextInput
            style={styles.textInput}
            onChangeText={this._handleChangeTags}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center"
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.darkGrey
  },
  pickerText: {
    color: colors.darkGrey
  },
  pickerTextLabel: {
    color: colors.darkGrey,
    fontWeight: "700"
  },
  inputContainer: {
    marginBottom: 10
  },
  inputLabel: {
    fontWeight: "700",
    fontSize: 17,
    marginBottom: 10,
    marginTop: 20
  },
  smallLabel: {
    fontWeight: "700",
    fontSize: 13,
    marginTop: 20,
    marginBottom: 5
  },
  textInput: {
    borderBottomWidth: 0.5,
    fontSize: 17,
    color: colors.darkGrey
  },
  pickedDate: {
    marginTop: 0,
    textAlign: "center"
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50
  },
  buttonTitle: {
    color: colors.darkGrey
  },
  button: {
    backgroundColor: "#ED6A5A",
    borderRadius: 10,
    width: 150
  }
});

export default CreateEventForm;
