import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { fetchAllEvents } from "../actions/event-action";

import UserScreen from "./UserScreen";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <UserScreen ofCurrentUser={true}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = ({ events }) => {
  return {
    events: events.events
  };
};

export default connect(
  mapStateToProps,
  { fetchAllEvents }
)(ProfileScreen);
