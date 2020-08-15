import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["white", "rgb(149, 156, 241)"]}
        style={styles.linearGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
      >
        <Text>hi my name is unnati
        </Text>
      </LinearGradient>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    height: 700,
    width: 450
  }
});
