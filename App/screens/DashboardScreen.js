import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

class DashboardScreen extends Component {
  render() {
      //if (this.state.fontsLoaded) {
        return (
          <View style={styles.container}>
            <LinearGradient
              colors={["white", "rgb(149, 156, 241)"]}
              style={styles.linearGradient}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 0.5 }}
            >
          </LinearGradient>
          </View>
        )}
  }

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
