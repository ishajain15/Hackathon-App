import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as Google from "expo-google-app-auth";
import * as Font from "expo-font";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

let customFonts = {
  "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
};

class LoginScreen extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accesToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              console.log("user signed in");
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  //time_zone: new Date().getTimezoneOffset()
                  ///time_zone: varIntl.DateTimeFormat().resolvedOptions().timeZone.resolvedOptions.timeZone
                })
                .then(function (snapshot) {
                  //console.log('Snapshot', snapshot);
                });
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };
  state = {
    fontsLoaded: false,
  };

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
        this.onSignIn(result);
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
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 0.4 }}
          >
            <Image
              style={styles.backgroundImage}
              source={require("../assets/loginscreen.png")}
            />
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
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 0,
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 7,
    marginBottom: -46,
  },
  image: {
    height: 18,
    width: 18,
  },

  text: {
    textAlign: "center",
    paddingLeft: 6,
    fontSize: 15,
    color: "#475BD6",
    fontFamily: "Inter-Black",
    lineHeight: 24,
  },

  backgroundImage: {
    height: windowHeight,
    width: windowWidth,
    position: "absolute",
    bottom: 0,
  },
});
