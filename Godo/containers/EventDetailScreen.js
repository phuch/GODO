import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Map from "../components/Map";
import AppHeader from "../components/AppHeader";
import { Button } from "react-native-elements";
import IconInfo from "../components/IconInfo";
import Icon from "react-native-vector-icons/EvilIcons";
import colors from "../constants/colors";
import moment from "moment/moment";
import basicStyles from "../constants/basicStyles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from "../Firebase";
import { registerToEvent, unregisterToEvent } from "../actions/events-action";

const screenWidth = Dimensions.get("window").width;

class EventDetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNavigation = (routeName, params) => {
    const { navigation } = this.props;
    navigation.navigate(routeName, params);
  };

  isGoing = () => {
    const { id } = this.props.navigation.state.params;
    const event = this.props.nearbyEvents.find(e => e.id === id);

    return event.attendees.some(docRef => {
      return docRef.id === firebase.auth().currentUser.uid;
    });
  };

  render() {
    const { id } = this.props.navigation.state.params;
    const event = this.props.nearbyEvents.find(e => e.id === id);
    const {
      location,
      name,
      description,
      time,
      publisher,
      slots,
      attendees,
      fee
    } = event;
    const formattedDate = moment.unix(time.seconds).format("MMM D");
    const formattedTime = moment.unix(time.seconds).format("k:mm");
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <AppHeader
            hasBackButton={true}
            title={name}
            rightIcons={
              firebase.auth().currentUser.uid === publisher.id && (
                <TouchableOpacity>
                  <Icon name="pencil" size={40} color={colors.darkGrey} />
                </TouchableOpacity>
              )
            }
            navigation={this.props.navigation}
          />
          <Map eventLocation={location} />
          <View style={styles.infoSubContainer}>
            <IconInfo
              iconName="Calendar"
              title={`${formattedDate}, ${formattedTime}`}
            />
            <IconInfo
              iconName="User"
              title={`${attendees.length}/${slots}`}
              onPress={() =>
                this.handleNavigation("EventMemberListScreen", { event })
              }
            />
          </View>
          <View style={styles.infoSubContainer}>
            <IconInfo
              iconName="Mascot"
              title={publisher.fullName}
              onPress={() =>
                this.props.navigation.navigate("UserScreen", {
                  profile: publisher
                })
              }
            />
            <IconInfo iconName="Money" title={fee} />
          </View>
          <View style={{ padding: 20 }}>
            <Text>{description}</Text>
          </View>
          {this.isGoing() ? (
            <Button
              containerViewStyle={[
                basicStyles.buttonContainer,
                styles.buttonContainer
              ]}
              title="NOT GOING"
              buttonStyle={styles.notGoingButton}
              textStyle={basicStyles.buttonTitle}
              onPress={() => this.props.unregisterToEvent(event)}
            />
          ) : (
            <Button
              containerViewStyle={[
                basicStyles.buttonContainer,
                styles.buttonContainer
              ]}
              title="GOING"
              buttonStyle={styles.goingButton}
              textStyle={basicStyles.buttonTitle}
              onPress={() => this.props.registerToEvent(event)}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white"
  },
  infoSubContainer: {
    width: screenWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonContainer: {
    paddingBottom: 10,
    justifyContent: "flex-end"
  },
  goingButton: {
    backgroundColor: colors.primary,
    borderRadius: 10
  },
  notGoingButton: {
    backgroundColor: colors.secondary,
    borderRadius: 10
  }
});

const mapStateToProps = state => {
  const { nearbyEvents } = state.events;
  return { nearbyEvents };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ registerToEvent, unregisterToEvent }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailScreen);
