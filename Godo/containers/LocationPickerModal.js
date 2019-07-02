import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import Icon from "react-native-vector-icons/EvilIcons";
import {
  getLocations,
  searchLocations,
  createLocation
} from "../actions/location-action";
import AppHeader from "../components/AppHeader";
import LocationList from "../components/LocationList";
import SearchBar from "../components/SearchBar";
import BaseText from "../components/Text";
import colors from "../constants/colors";
import basicStyles from "../constants/basicStyles";

class LocationPickerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddingLocation: false,
      q: "",
      validation: {},
      location: null
    };

    this.searchLocationDebounced = _.debounce(this.searchLocation, 300);
  }

  componentDidMount() {
    this.props.getLocations();
  }

  searchLocation = term => {
    this.setState({ q: term });
    this.props.searchLocations(term);
  };

  toggleAddLocation = () => {
    this.setState({
      isAddingLocation: !this.state.isAddingLocation,
      location: {},
      validation: {}
    });
  };

  _handleChangeValue = (field, value) => {
    const location = { ...this.state.location };
    location[field] = value;
    this.setState({ location });
    if (value || value === 0) {
      delete this.state.validation[field];
    }
  };

  _validateField = field => {
    if (!this.state.location[field]) {
      this.setState(prevState => {
        const validation = { ...prevState.validation };
        validation[field] = true;

        return { validation };
      });
    }
  };

  _checkCanSubmit = () => {
    const { location } = this.state;
    if (!location) return true;
    return !location.name || !location.address;
  };

  createLocation = () => {
    const onSelectLocation = this.props.navigation.getParam(
      "onSelectLocation",
      null
    );
    this.props.createLocation(this.state.location).then(location => {
      onSelectLocation(location);
      this.props.navigation.pop();
    });
  };

  renderLocationList = () => {
    const { locations, searchResult, loading, navigation } = this.props;
    const onSelectLocation = navigation.getParam("onSelectLocation", null);
    return (
      <View style={styles.body}>
        <View>
          <SearchBar
            style={{ marginBottom: 0 }}
            value={this.state.q}
            onChangeText={term => this.searchLocationDebounced(term)}
            placeholder="Search location"
          />
        </View>
        <LocationList
          locations={this.state.q ? searchResult : locations}
          loading={loading}
          onItemPress={onSelectLocation}
          navigation={navigation}
        />
      </View>
    );
  };

  renderAddLocation = () => {
    return (
      <View style={styles.body}>
        <ScrollView style={{ flex: 1 }} scrollEnabled={false}>
          <View style={styles.inputContainer}>
            <BaseText
              style={[
                styles.inputLabel,
                this.state.validation.name && styles.warningText
              ]}
            >
              Location's name
            </BaseText>
            <TextInput
              style={[
                styles.textInput,
                this.state.validation.name && styles.warningField
              ]}
              value={this.state.location.name}
              onChangeText={text => this._handleChangeValue("name", text)}
              onBlur={() => this._validateField("name")}
              placeholder="Your current location name"
            />
            {this.state.validation.name && (
              <BaseText style={[styles.warningText, { paddingTop: 2 }]}>
                Name field is required
              </BaseText>
            )}
          </View>

          <View style={styles.inputContainer}>
            <BaseText
              style={[
                styles.inputLabel,
                this.state.validation.address && styles.warningText
              ]}
            >
              Address
            </BaseText>
            <TextInput
              style={[
                styles.textInput,
                this.state.validation.address && styles.warningField
              ]}
              value={this.state.location.address}
              onChangeText={text => this._handleChangeValue("address", text)}
              onBlur={() => this._validateField("address")}
              placeholder="Street address, City, Country"
            />
            {this.state.validation.address && (
              <BaseText style={[styles.warningText, { paddingTop: 2 }]}>
                Address field is required
              </BaseText>
            )}
          </View>
        </ScrollView>
        <Button
          containerViewStyle={styles.buttonContainer}
          disabled={this._checkCanSubmit()}
          title="SUBMIT"
          buttonStyle={styles.submitButton}
          textStyle={basicStyles.buttonTitle}
          onPress={this.createLocation}
        />
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const onSelectLocation = navigation.getParam("onSelectLocation", null);

    return (
      <View style={styles.container}>
        <AppHeader
          hasBackButton={true}
          title="Location"
          navigation={navigation}
          onNavigateBack={onSelectLocation}
          rightIcons={
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={this.toggleAddLocation}
            >
              {this.state.isAddingLocation ? (
                <Icon name="close-o" size={35} color={colors.darkGrey} />
              ) : (
                <Icon name="plus" size={35} color={colors.darkGrey} />
              )}
            </TouchableOpacity>
          }
        />
        {this.state.isAddingLocation
          ? this.renderAddLocation()
          : this.renderLocationList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: "stretch"
  },
  body: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15
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
  },
  buttonContainer: {
    paddingBottom: 10,
    justifyContent: "flex-end",
    width: "100%",
    marginLeft: 0,
    marginRight: 0
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 10
  }
});

const mapStateToProps = state => {
  const { locations, loading, searchResult } = state.location;
  return {
    loading,
    locations,
    searchResult
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getLocations, searchLocations, createLocation },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationPickerModal);
