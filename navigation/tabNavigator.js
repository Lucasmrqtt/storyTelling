import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Feed from "../screens/feed";
import CreateStory from "../screens/createStory";
import Ionicons from "react-native-vector-icons/Ionicons"
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator()

export default class TabNavigator extends Component {
  constructor() {
    super()
    this.state = {
      light_theme: true,
      isUpdated: false
    }
  }

  renderFeed = props => {
    return <Feed setUpdateToFalse={this.removeUpdated} {...props} />;
  };

  renderStory = props => {
    return <CreateStory setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  changeUpdated = () => {
    this.setState({ isUpdated: true });
  };

  removeUpdated = () => {
    this.setState({ isUpdated: false });
  };

  componentDidMount() {
    let theme
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({
      light_theme: theme === "light" ? true : false,
    });
  }

  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={this.state.light_theme ? styles.bottomTabStyleLight : styles.bottomTabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Feed') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Create Story') {
              iconName = focused ? 'create' : 'create-outline';
            }
            return <Ionicons name={iconName} size={20} color={color} style={styles.icons} />;
          },
        })}
        activeColor={"#ee8249"}
        inactiveColor={"gray"}
      >
        <Tab.Screen name="Feed" component={this.renderFeed} options={{unmountOnBlur:true}}/>
        <Tab.Screen name="Create Story" component={this.renderStory} options={{unmountOnBlur:true}}/>
      </Tab.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  bottomTabStyleLight: {
    backgroundColor: "#eaeaea",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});
