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
import LocationPickerModal from "../containers/LocationPickerModal";
import EventMemberListScreen from "../containers/EventMemberListScreen";

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

  if (routeName === "LocationPicker" || routeName === "DateTimePicker") {
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
    }
  },
  {
    initialRouteName: "Browse",
    headerMode: "none"
  }
);

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
    }
  },
  {
    initialRouteName: "Profile",
    headerMode: "none"
  }
);

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
    App: {
      screen: AppNavigator
    },
    Authentication: {
      screen: AuthenticationScreen
    }
  },
  {
    initialRouteName: "Authentication",
    headerMode: "none"
  }
);

export default RootNavigator;
