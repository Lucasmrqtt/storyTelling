import React, {Component}  from "react";
import {Text, View, StyleSheet} from "react-native"
import firebase from "firebase";

export default class Logout extends Component {
  componentDidMount(){
    firebase.auth().signOut()
    this.props.navigation.replace("Login")
  }
  
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.text}>
          Logout
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  text:{
    fontSize:20,
    fontWeight:"bold",
  },
})