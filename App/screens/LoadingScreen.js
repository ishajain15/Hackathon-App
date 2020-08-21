import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import firebase from "firebase";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          this.props.navigation.navigate("DashboardScreen");
           //user.providerData.forEach(function (profile) {
           // console.log("Sign-in provider: " + user.providerId);
          //  console.log("  Provider-specific UID: " + user.uid);
           // console.log("  Name: " + user.displayName);
          //  console.log("  Email: " + user.email);
           // console.log("  Photo URL: " + user.photoURL);
          //});
        } else {
          this.props.navigation.navigate("LoginScreen");
        }
      }.bind(this)
    );
  };


  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
