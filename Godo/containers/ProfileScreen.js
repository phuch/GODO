import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import UserScreen from "./UserScreen";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <UserScreen ofCurrentUser={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = store => {
  const { events } = store.browseScreenState;
  return {
    events
  };
};

export default connect(mapStateToProps)(ProfileScreen);
