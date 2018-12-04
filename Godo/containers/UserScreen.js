import React from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Avatar } from "react-native-elements";

import colors from "../constants/colors";
import reviews from "../fixtures/reviews.json";

import AppHeader from "../components/AppHeader";
import SvgIcon from "../components/SvgIcon";
import ReviewList from "../components/ReviewList";
import EventList from "../components/EventList";
import BaseText, { HeaderText } from "../components/Text";
import {randomImage} from "../util/imageUtils";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchUsersEvents, userSignOut} from "../actions/user-action";

class UserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: false,
      points: 0,
    };
  }

  componentDidMount() {
    this.props.fetchUsersEvents();
  }

  renderLikeButton = () => {
    const { isLiked } = this.state;
    return (
      <View style={{marginRight: 20}}>
        {isLiked ? (
          <SvgIcon name="LikeColor" width={50} height={50} />
        ) : (
          <SvgIcon
            name="LikeGrey"
            width={50}
            height={50}
            fill={colors.darkGrey}
          />
        )}
      </View>
    );
  };

  toggleFavorite = () => {
    this.setState({isLiked: !this.state.isLiked}, () => {
        const {points, isLiked} = this.state
        this.setState({points: isLiked ? points + 1 : points - 1})
    });
  };

  userSignOut = () => {
    const { userSignOut, navigation } = this.props
    Alert.alert(
      '',
      'Log out of your account?',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'OK', onPress: () => userSignOut().then(navigation.navigate('Authentication'))},
      ],
      { cancelable: false }
    )
  }

  render() {
    const { showAddButton, ofCurrentUser, profile } = this.props;
    const { points } = this.state
    const reviewData = new Array(reviews[0]);

    return (
      <View style={styles.container}>
        <AppHeader
          rightIcons={
            ofCurrentUser ? (
                <View style={{ flexDirection: 'row' }}>
                  {/*<Icon style={{ marginRight: 20 }} name="edit-2" size={30} color={colors.darkGrey} />*/}
                  <Icon name="power" size={30} color={colors.secondary} onPress={this.userSignOut}/>
                </View>
            ) : (
              undefined
            )
          }
        />
        <View style={styles.general}>
          <View style={{ alignItems: "center" }}>
            <Avatar
                xlarge
                rounded
                source={randomImage()}
                activeOpacity={0.7}
                avatarStyle={{
                    borderWidth: 8,
                    borderColor: colors.secondary,
                    borderTopLeftRadius: 1
                }}
            />
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:20}}>
              {ofCurrentUser && (
                  <TouchableOpacity onPress={() => this.toggleFavorite()}>
                      {this.renderLikeButton()}
                  </TouchableOpacity>
              )}
              <View>
                <HeaderText style={{ fontSize: 20, paddingTop: 15 }}>
                  {profile.fullName}
                </HeaderText>
                <BaseText style={{ fontSize: 15, paddingTop: 5 }}>
                  {points} {points === 0 || points === 1 ? `point` : `points`}
                </BaseText>
              </View>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <ReviewList
            data={reviewData}
            scrollEnabled={false}
            showAddButton={showAddButton}
          />
          <View style={{ flex: 1 }}>
            <EventList events={this.props.events} showHeader={true} navigation={this.props.navigation}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "stretch"
  },
  general: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10
  }
});

const mapStateToProps = store => {
  const { events } = store.userState;
  const { profile } = store.firebase
  return {
    events, profile
  };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ userSignOut, fetchUsersEvents }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
