import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as Google from "expo-google-app-auth";
import * as Font from "expo-font";

let customFonts = {
  "Inter-Black": require("../assets/fonts/Inter-Black.ttf")
};

class LoginScreen extends Component {
  state = {
    fontsLoaded: false
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        //androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: "web",
        iosClientId:
          "730876437748-n4o4s2jcc1rqrmvlvd6kc9pf0bh8j8h4.apps.googleusercontent.com",
        scopes: ["profile", "email"]
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

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <LinearGradient
            colors={["white", "rgb(149, 156, 241)"]}
            style={styles.linearGradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.5 }}
          >
            <Text>hi my name is unnati</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.signInWithGoogleAsync()}
            >
              <Text style={styles.text}>
                <Image
                  style={styles.image}
                  source={require("../assets/google.png")}
                />
                SIGN IN WITH GOOGLE
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <StatusBar style="auto" />
        </View>
      );
    } else {
      return <Text>Didn't Work :(</Text>;
    }
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
    //flex is a way to create elements that will magically fill a certain space without you dealing with the mechanics
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10
  },
  image: {
    height: 18,
    width: 18
  },

  text: {
    textAlign: "center",
    paddingLeft: 6,
    fontSize: 20,
    color: "#475BD6",
    fontFamily: "Inter-Black",
    lineHeight: 24
  }
});
