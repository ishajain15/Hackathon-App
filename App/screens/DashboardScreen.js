import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-community/picker";
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
          <Picker
            //selectedValue={this.state.language}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </LinearGradient>
      </View>
    );
  }
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
