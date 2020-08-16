import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as Google from "expo-google-app-auth";

class LoginScreen extends Component {
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        //androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: "web",
        iosClientId:
          "730876437748-n4o4s2jcc1rqrmvlvd6kc9pf0bh8j8h4.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["white", "rgb(149, 156, 241)"]}
          style={styles.linearGradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
        >
          <Text>hi my name is unnati</Text>
          <Button
            title="Sign in with Google"
            onPress={() => this.signInWithGoogleAsync()}
          />
        </LinearGradient>
        <StatusBar style="auto" />
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    height: 700,
    width: 450,
  },
});
