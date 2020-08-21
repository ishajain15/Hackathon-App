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
           // console.log("Sign-in provider: " + profile.providerId);
          //  console.log("  Provider-specific UID: " + profile.uid);
          //  console.log("  Name: " + profile.displayName);
          //  console.log("  Email: " + profile.email);
           // console.log("  Photo URL: " + profile.photoURL);
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
