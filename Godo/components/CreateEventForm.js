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
      event: {},
      validation: {},
      value: {}
    };
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    if (!date && !this.state.seletedDateTime) {
      this.setState(prevState => {
        const validation = { ...prevState.validation };
        validation.dateTime = true;

        return { validation };
      });
    } else if (date) {
      delete this.state.validation.dateTime;
      this.setState(
        {
          seletedDateTime: date,
          event: { ...this.state.event, time: date }
        },
        () => {
          this.props.onChangeData(this.state.event);
        }
      );
    }
    this._hideDateTimePicker();
  };

  _handleLocationPicked = location => {
    if (!location && !this.state.selectedLocation) {
      this.setState(prevState => {
        const validation = { ...prevState.validation };
        validation.location = true;

        return { validation };
      });
    } else if (location) {
      delete this.state.validation.location;
      this.setState(
        {
          selectedLocation: location,
          event: { ...this.state.event, location }
        },
        () => this.props.onChangeData(this.state.event)
      );
    }
  };

  _handleChangeValue = (field, value) => {
    const event = { ...this.state.event };
    event[field] = value;
    this.setState({ event }, () => this.props.onChangeData(this.state.event));
    if (value || value === 0) {
      delete this.state.validation[field];
    }
  };

  _handleChangeTags = tagsString => {
    const tags = tagsString.split(",").map(tag => tag.trim().toLowerCase());
    this.setState({
      event: { ...this.state.event, tags: tags }
    });
    this.props.onChangeData(this.state.event);
  };

  _validateField = field => {
    if (!this.state.event[field]) {
      this.setState(prevState => {
        const validation = { ...prevState.validation };
        validation[field] = true;

        return { validation };
      });
    }
  };

  _renderDateTimePicker = () => {
    return (
      <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this._handleDatePicked}
        onCancel={this._handleDatePicked}
        mode="datetime"
      />
    );
  };

  render() {
    const { category } = this.props;
    return (
      <View style={styles.container}>
        {/* NAME FIELD */}
        <View style={styles.inputContainer}>
          <BaseText
            style={[
              styles.inputLabel,
              this.state.validation.name && styles.warningText
            ]}
          >
            Event's name
          </BaseText>
          <TextInput
            style={[
              styles.textInput,
              this.state.validation.name && styles.warningField
            ]}
            value={this.state.event.name}
            onChangeText={text => this._handleChangeValue("name", text)}
            onBlur={() => this._validateField("name")}
          />
          {this.state.validation.name && (
            <BaseText style={[styles.warningText, { paddingTop: 2 }]}>
              Name field is required
            </BaseText>
          )}
        </View>

        {/* LOCATION FIELD */}
        <View>
          <TouchableOpacity
            style={[
              styles.inputContainer,
              styles.modalButton,
              this.state.validation.location && styles.warningField
            ]}
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
                <BaseText
                  style={[
                    styles.inputLabel,
                    this.state.validation.location && styles.warningText
                  ]}
                >
                  Add Location
                </BaseText>
              )}
            </View>
            <View>
              <Icon
                name="chevron-right"
                size={35}
                color={
                  this.state.validation.location
                    ? colors.secondary
                    : colors.darkGrey
                }
                style={{ marginBottom: 10, marginTop: 20 }}
              />
            </View>
          </TouchableOpacity>
          {this.state.validation.location && (
            <BaseText style={[styles.warningText, { paddingTop: 2 }]}>
              Location field is required
            </BaseText>
          )}
        </View>

        {/* DATETIME FIELD */}
        <View>
          <TouchableOpacity
            style={[
              styles.inputContainer,
              styles.modalButton,
              this.state.validation.dateTime && styles.warningField
            ]}
            onPress={this._showDateTimePicker}
          >
            <View>
              {this.state.seletedDateTime ? (
                <View>
                  <BaseText style={styles.smallLabel}>Date and Time</BaseText>
                  <BaseText style={{ fontSize: 17, marginBottom: 7 }}>
                    {moment(this.state.seletedDateTime).format(
                      "MMM D YYYY, h:mm A"
                    )}
                  </BaseText>
                </View>
              ) : (
                <BaseText
                  style={[
                    styles.inputLabel,
                    this.state.validation.dateTime && styles.warningText
                  ]}
                >
                  Date and Time
                </BaseText>
              )}
            </View>
            <View>
              <Icon
                name="chevron-right"
                size={35}
                color={
                  this.state.validation.dateTime
                    ? colors.secondary
                    : colors.darkGrey
                }
                style={{ marginBottom: 10, marginTop: 20 }}
              />
            </View>
          </TouchableOpacity>
          {this._renderDateTimePicker()}
          {this.state.validation.dateTime && (
            <BaseText style={[styles.warningText, { paddingTop: 2 }]}>
              Date and Time field is required
            </BaseText>
          )}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* PEOPLE FIELD */}
          <View style={[styles.inputContainer, { flex: 1, marginRight: 20 }]}>
            <BaseText
              style={[
                this.state.validation.slots && styles.warningText,
                styles.inputLabel
              ]}
            >
              People
            </BaseText>
            <TextInput
              style={[
                this.state.validation.slots && styles.warningField,
                styles.textInput
              ]}
              keyboardType="number-pad"
              onChangeText={number => this._handleChangeValue("slots", number)}
              onBlur={() => this._validateField("slots")}
            />
            {this.state.validation.slots && (
              <BaseText style={[styles.warningText, { paddingTop: 2 }]}>
                People field is required
              </BaseText>
            )}
          </View>

          {/* FEE FIELD */}
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <BaseText
              style={[
                this.state.validation.fee && styles.warningText,
                styles.inputLabel
              ]}
            >
              Fee
            </BaseText>
            <TextInput
              style={[
                this.state.validation.fee && styles.warningField,
                styles.textInput
              ]}
              keyboardType="number-pad"
              onChangeText={number => this._handleChangeValue("fee", number)}
              onBlur={() => this._validateField("fee")}
            />
            {this.state.validation.fee && (
              <BaseText style={[styles.warningText, { paddingTop: 2 }]}>
                Fee field is required
              </BaseText>
            )}
          </View>
        </View>

        {/* CATEGORY FIELD */}
        <View style={styles.inputContainer}>
          <View style={styles.dropDownArea}>
            <Dropdown
              label="Category"
              data={category}
              baseColor={
                this.state.validation.category
                  ? colors.secondary
                  : colors.darkGrey
              }
              itemColor={colors.darkGrey}
              dropdownPosition={0}
              itemTextStyle={styles.pickerText}
              labelTextStyle={styles.pickerTextLabel}
              baseTextStyle={styles.pickerText}
              onChangeText={value => this._handleChangeValue("category", value)}
              onBlur={() => this._validateField("category")}
            />
          </View>
          {this.state.validation.category && (
            <BaseText style={[styles.warningText, { paddingTop: 2 }]}>
              Category field is required
            </BaseText>
          )}
        </View>

        {/* DESCRIPTION FIELD */}
        <View style={styles.inputContainer}>
          <BaseText
            style={[
              this.state.validation.description && styles.warningText,
              styles.inputLabel
            ]}
          >
            Description
          </BaseText>
          <TextInput
            style={[
              this.state.validation.description && styles.warningField,
              styles.textInput
            ]}
            multiline={true}
            onChangeText={value =>
              this._handleChangeValue("description", value)
            }
            onBlur={() => this._validateField("description")}
          />
          {this.state.validation.description && (
            <BaseText style={[styles.warningText, { paddingTop: 2 }]}>
              Description field is required
            </BaseText>
          )}
        </View>

        {/* TAGS FIELD */}
        <View style={styles.inputContainer}>
          <BaseText style={styles.inputLabel}>Tags</BaseText>
          <TextInput
            style={styles.textInput}
            onChangeText={this._handleChangeTags}
            placeholder="Seperate tags with commas"
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
  warningText: {
    color: colors.secondary
  },
  warningField: {
    borderBottomColor: colors.secondary
  }
});

export default CreateEventForm;
