import React, {Component} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./tabNavigator";
import StoryScreen from "../screens/storyScreen";

const Stack = createStackNavigator()

export default class StackNavigator extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Tab" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Tab" component={TabNavigator}/>
        <Stack.Screen name="StoryScreen" component={StoryScreen}/>
      </Stack.Navigator>
    )
  }
}