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

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    EventDetail: {
      screen: EventDetailScreen
    },
    CreateEvent: {
      screen: CreateEventScreen
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

const BrowseNavigator = createStackNavigator(
  {
    Browse: {
      screen: BrowseScreen
    },
    EventDetail: {
      screen: EventDetailScreen
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
        tabBarButtonComponent: Ripple
      }
    },
    Browse: {
      screen: BrowseNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const iconName = "search";
          return <Icon name={iconName} size={24} color={tintColor} />;
        },
        tabBarButtonComponent: Ripple
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const iconName = "user";
          return <Icon name={iconName} size={24} color={tintColor} />;
        },
        tabBarButtonComponent: Ripple
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
    }
  },
  {
    initialRouteName: "App",
    headerMode: "none"
  }
);

export default RootNavigator;
