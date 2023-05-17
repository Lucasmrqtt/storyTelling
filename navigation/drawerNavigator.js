import React, {Component} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./stackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";
import firebase from "firebase";
import CustomSidebarMenu from "../screens/customSidebarMenu";

const Drawer = createDrawerNavigator()

export default class DrawerNavigator extends Component {
  constructor(props){
    super(props)
    this.state = {
      light_theme: true,
      isUpdated: false
    }
  }

  renderHome = props => {
    return <StackNavigator setUpdateToFalse={this.removeUpdated} {...props} />;
  };

  renderProfile = props => {
    return <Profile setUpdateToTrue={this.changeUpdated} {...props} />;
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
    let props = this.props
    return (
      <Drawer.Navigator drawerContentOptions={{
        activeTintColor:"#E91E63",
        inactiveTintColor:this.state.light_theme ? "#000" : "#FFF",
        itemStyle:{marginVertical:5},
        backgroundColor: this.state.light_theme ? "#FFF" : "#15193c",
        color: this.state.light_theme ? "#000" : "#FFF"
      }} 
      drawerContent={props => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen name="Home" component={this.renderHome} options={{unmountOnBlur:true}} />
        <Drawer.Screen name="Profile" component={this.renderProfile} options={{unmountOnBlur:true}} />
        <Drawer.Screen name="Logout" component={Logout} options={{unmountOnBlur:true}} />
      </Drawer.Navigator>
    )
  }
}
