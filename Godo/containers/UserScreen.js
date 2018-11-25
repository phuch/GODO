import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/EvilIcons";
import { Avatar } from "react-native-elements";

import colors from "../constants/colors";
import reviews from "../fixtures/reviews.json";
import { fetchUsersEvents } from "../actions/user-action";

import AppHeader from "../components/AppHeader";
import SvgIcon from "../components/SvgIcon";
import ReviewList from "../components/ReviewList";
import EventList from "../components/EventList";
import BaseText, { HeaderText } from "../components/Text";

class UserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: false,
      isDisliked: false
    };
  }

  componentDidMount() {
    this.props.fetchUsersEvents();
  }

  renderLikeButton = () => {
    const { isLiked } = this.state;
    return (
      <View>
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

  toggleFavorite = button => {
    if (button === "like") {
      this.setState({ isLiked: !this.state.isLiked, isDisliked: false });
    } else {
      this.setState({ isLiked: false, isDisliked: !this.state.isDisliked });
    }
  };

  renderDislikeButton = () => {
    const { isDisliked } = this.state;
    return (
      <View>
        {isDisliked ? (
          <SvgIcon name="DislikeColor" width={50} height={50} />
        ) : (
          <SvgIcon
            name="DislikeGrey"
            width={50}
            height={50}
            fill={colors.darkGrey}
          />
        )}
      </View>
    );
  };

  render() {
    const { showAddButton, ofCurrentUser } = this.props;
    const reviewData = new Array(reviews[0]);

    return (
      <View style={styles.container}>
        <AppHeader
          rightIcons={
            ofCurrentUser ? (
              <TouchableOpacity>
                <Icon name="pencil" size={35} color={colors.darkGrey} />
              </TouchableOpacity>
            ) : (
              undefined
            )
          }
        />
        <View style={styles.general}>
          {ofCurrentUser && (
            <TouchableOpacity onPress={() => this.toggleFavorite("like")}>
              {this.renderLikeButton()}
            </TouchableOpacity>
          )}
          <View style={{ alignItems: "center" }}>
            <Avatar
              xlarge
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
              }}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              avatarStyle={{
                borderWidth: 8,
                borderColor: colors.secondary,
                borderTopLeftRadius: 1
              }}
            />
            <HeaderText style={{ fontSize: 20, paddingTop: 15 }}>
              John AppleSeed
            </HeaderText>
            <BaseText style={{ fontSize: 15, paddingTop: 5 }}>
              34 points
            </BaseText>
          </View>
          {ofCurrentUser && (
            <TouchableOpacity onPress={() => this.toggleFavorite("dislike")}>
              {this.renderDislikeButton()}
            </TouchableOpacity>
          )}
        </View>
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <ReviewList
            data={reviewData}
            scrollEnabled={false}
            showAddButton={showAddButton}
          />
          <View style={{ flex: 1 }}>
            <EventList
              events={this.props.events}
              showHeader={true}
              navigation={this.props.navigation}
            />
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
  return {
    events
  };
};

export default connect(
  mapStateToProps,
  { fetchUsersEvents }
)(UserScreen);
