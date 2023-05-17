import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DrawerNavigator from './navigation/drawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/tabNavigator';
import RegisterScreen from './screens/register';
import LoginScreen from './screens/login';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const Stack = createStackNavigator()
const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
      <Stack.Screen name='Dashboard' component={DrawerNavigator} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
  );
}