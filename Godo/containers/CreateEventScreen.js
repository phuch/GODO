import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import _ from "lodash";
import { connect } from "react-redux";
import colors from "../constants/colors";
import AppHeader from "../components/AppHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CreateEventForm from "../components/CreateEventForm";
import { bindActionCreators } from "redux";
import { createEvent, fetchNearbyEvents } from "../actions/events-action";

class CreateEventScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newEvent: null
    };

    this.eventCategory = [
      {
        value: "Sports"
      },
      {
        value: "Music and Arts"
      },
      {
        value: "Craft"
      },
      {
        value: "Others"
      }
    ];
  }

  handleNavigation = (routeName, params) => {
    const { navigation } = this.props;
    navigation.navigate(routeName, params);
  };

  handleFormSubmit = () => {
    this.props.navigation.pop();
    this.props
      .createEvent(this.state.newEvent)
      .then(newEvent =>
        this.handleNavigation("EventDetail", { event: newEvent })
      );
  };

  checkCanSubmit = () => {
    const { newEvent } = this.state;
    if (!newEvent) return true;
    return (
      !newEvent.name ||
      !newEvent.location ||
      !newEvent.time ||
      !newEvent.category ||
      !newEvent.description ||
      !(newEvent.slots || newEvent.slots === 0) ||
      !(newEvent.fee || newEvent.fee === 0)
    );
  };

  onChangeData = event => {
    this.setState({ newEvent: event });
  };

  render() {
    return (
      <View style={styles.container}>
        <AppHeader
          hasBackButton={true}
          title="Create activity"
          rightIcons={
            <TouchableOpacity
              onPress={this.handleFormSubmit}
              disabled={this.checkCanSubmit()}
            >
              <Icon
                name="check"
                size={40}
                color={
                  this.checkCanSubmit() ? colors.lightGrey : colors.primary
                }
              />
            </TouchableOpacity>
          }
          navigation={this.props.navigation}
        />
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}>
          <View style={styles.formContainer}>
            <CreateEventForm
              category={this.eventCategory}
              navigate={this.handleNavigation}
              onChangeData={this.onChangeData}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: colors.white
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white"
  }
});

mapStateToProps = state => {
  const { locations } = state.location;
  return { locations };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createEvent, fetchNearbyEvents }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEventScreen);
