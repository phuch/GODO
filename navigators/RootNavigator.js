import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Ripple from "react-native-material-ripple";
import HomeScreen from "../containers/HomeScreen";
import BrowseScreen from "../containers/BrowseScreen";
import ProfileScreen from "../containers/ProfileScreen";
import EventDetailScreen from "../containers/EventDetailScreen";
import Icon from "react-native-vector-icons/Feather";
import CreateEventScreen from "../containers/CreateEventScreen";
import AuthenticationScreen from "../containers/AuthenticationScreen";
import LoadingSreen from "../containers/LoadingScreen";
import EventMemberListScreen from "../containers/EventMemberListScreen";
import LocationPickerModal from "../containers/LocationPickerModal";
import UserScreen from "../containers/UserScreen";
import EventListScreen from "../containers/EventListScreen";
import ChatScreen from "../containers/ChatScreen";

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    EventDetail: {
      screen: EventDetailScreen
    },
    EventMemberListScreen: {
      screen: EventMemberListScreen
    },
    CreateEvent: {
      screen: CreateEventScreen
    },
    LocationPicker: {
      screen: LocationPickerModal,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    UserScreen: {
      screen: UserScreen
    },
    ChatScreen: {
      screen: ChatScreen
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    mode: "modal"
  }
);

HomeNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if (routeName === "LocationPicker" || routeName === "ChatScreen") {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

const BrowseNavigator = createStackNavigator(
  {
    Browse: {
      screen: BrowseScreen
    },
    EventDetail: {
      screen: EventDetailScreen
    },
    EventMemberListScreen: {
      screen: EventMemberListScreen
    },
    UserScreen: {
      screen: UserScreen
    },
    EventListScreen: {
      screen: EventListScreen
    },
    ChatScreen: {
      screen: ChatScreen
    }
  },
  {
    initialRouteName: "Browse",
    headerMode: "none"
  }
);

BrowseNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if (routeName === "ChatScreen") {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen
    },
    EventDetail: {
      screen: EventDetailScreen
    },
    EventMemberListScreen: {
      screen: EventMemberListScreen
    },
    UserScreen: {
      screen: UserScreen
    },
    ChatScreen: {
      screen: ChatScreen
    }
  },
  {
    initialRouteName: "Profile",
    headerMode: "none"
  }
);

ProfileNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if (routeName === "ChatScreen") {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: "Home",
        tabBarIcon: ({ focused, tintColor }) => {
          const iconName = "map-pin";
          return <Icon name={iconName} size={24} color={tintColor} />;
        },
        tabBarButtonComponent: Ripple,
        tabBarLabel: "Home"
      }
    },
    Browse: {
      screen: BrowseNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const iconName = "search";
          return <Icon name={iconName} size={24} color={tintColor} />;
        },
        tabBarButtonComponent: Ripple,
        tabBarLabel: "Browse"
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const iconName = "user";
          return <Icon name={iconName} size={24} color={tintColor} />;
        },
        tabBarButtonComponent: Ripple,
        tabBarLabel: "Profile"
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      showLabel: false
    },
    headerMode: "none"
  }
);

const RootNavigator = createStackNavigator(
  {
    Loading: {
      screen: LoadingSreen
    },
    App: {
      screen: AppNavigator
    },
    Authentication: {
      screen: AuthenticationScreen
    }
  },
  {
    initialRouteName: "Loading",
    headerMode: "none"
  }
);

export default RootNavigator;
