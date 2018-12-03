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

const screenWidth = Dimensions.get("window").width;

class EventDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: false
    };
  }

  toggleGoingStatus = () => {
    const { isGoing } = this.state;
    this.setState({ isGoing: !isGoing });
  };

  render() {
    const { isGoing } = this.state;
    const {
      event: {
        location,
        name,
        description,
        time,
        publisher,
        slots,
        joined,
        fee
      }
    } = this.props.navigation.state.params;
    const formattedDate = moment.unix(time.seconds).format("MMM D");
    const formattedTime = moment.unix(time.seconds).format("k:mm");
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <AppHeader
            hasBackButton={true}
            title={name}
            rightIcons={
              <TouchableOpacity>
                <Icon name="pencil" size={40} color={colors.darkGrey} />
              </TouchableOpacity>
            }
            navigation={this.props.navigation}
          />
          <Map eventLocation={location} />
          <View style={styles.infoSubContainer}>
            <IconInfo
              iconName="Calendar"
              title={`${formattedDate},${formattedTime}`}
            />
            <IconInfo iconName="User" title={`${joined}/${slots}`} />
          </View>
          <View style={styles.infoSubContainer}>
            <IconInfo iconName="Mascot" title={publisher} />
            <IconInfo iconName="Money" title={fee} />
          </View>
          <View style={{ padding: 20 }}>
            <Text>{description}</Text>
          </View>
          {isGoing ? (
            <Button
              containerViewStyle={[
                basicStyles.buttonContainer,
                styles.buttonContainer
              ]}
              title="NOT GOING"
              buttonStyle={styles.notGoingButton}
              textStyle={basicStyles.buttonTitle}
              onPress={this.unRegisterToEvent}
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
              onPress={this.registerToEvent}
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailScreen);
