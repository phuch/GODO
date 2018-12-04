import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { DotIndicator } from "react-native-indicators";
import { Button } from "react-native-elements";
import colors from "../constants/colors";
import AppHeader from "../components/AppHeader";
import Icon from "react-native-vector-icons/EvilIcons";
import basicStyles from "../constants/basicStyles";
import EventMemberList from "../components/EventMemberList";
import { listParticipants } from "../actions/events-action";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class EventMemberListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: false
    };
  }

  componentDidMount() {
    const event = this.props.navigation.getParam("event", null);
    this.props.listParticipants(event);
  }

  renderLoadingIndicator = () => {
    return (
      <View style={{ paddingTop: 40 }}>
        <DotIndicator
          count={3}
          size={10}
          color={colors.secondary}
          animationDuration={800}
        />
      </View>
    );
  };

  render() {
    const { isGoing } = this.state;
    const event = this.props.navigation.getParam("event", null);
    const { participants, loadingParticipants } = this.props;

    const eventParticipants = participants.find(
      parEvent => parEvent.id === event.id
    );

    return (
      <View style={styles.container}>
        <AppHeader
          hasBackButton={true}
          title={event.name}
          rightIcons={
            <TouchableOpacity>
              <Icon name="comment" size={35} color={colors.darkGrey} />
            </TouchableOpacity>
          }
          navigation={this.props.navigation}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            paddingHorizontal: 15
          }}
        >
          {loadingParticipants ? (
            this.renderLoadingIndicator()
          ) : (
            <View style={{ flex: 1 }}>
              <EventMemberList
                users={
                  eventParticipants ? eventParticipants.participants : null
                }
                loading={loadingParticipants}
                event={event}
              />
            </View>
          )}
          <View>
            {isGoing ? (
              <Button
                containerViewStyle={styles.buttonContainer}
                title="NOT GOING"
                buttonStyle={styles.notGoingButton}
                textStyle={basicStyles.buttonTitle}
                onPress={() => {}}
              />
            ) : (
              <Button
                containerViewStyle={styles.buttonContainer}
                title="GOING"
                buttonStyle={styles.goingButton}
                textStyle={basicStyles.buttonTitle}
                onPress={() => {}}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "stretch"
  },
  goingButton: {
    backgroundColor: colors.primary,
    borderRadius: 10
  },
  notGoingButton: {
    backgroundColor: colors.secondary,
    borderRadius: 10
  },
  buttonContainer: {
    paddingBottom: 10
  }
});

const mapStateToProps = state => {
  const { participants, loadingParticipants } = state.events;
  return { participants, loadingParticipants };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ listParticipants }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventMemberListScreen);
