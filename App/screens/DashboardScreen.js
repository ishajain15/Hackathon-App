import React, { Component } from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
//import { Picker } from "@react-native-community/picker";
import DropDownPicker from "react-native-dropdown-picker";

class DashboardScreen extends Component {
  render() {
    this.state = {
      choice: "aldskfja;sdlfj",
      country: null,
    };

    //if (this.state.fontsLoaded) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["white", "rgb(149, 156, 241)"]}
          style={styles.linearGradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
        >
          <DropDownPicker
            items={[
              { label: "CST", value: "central" },
              { label: "EST", value: "eastern" },
              { label: "PST", value: "pacific" },
              { label: "MDT", value: "mountain" },
              { label: "IST", value: "indian" },
              { label: "GMT", value: "greenwich median" },
            ]}
            defaultValue={this.state.country}
            containerStyle={{ height: 50, width: 250 }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{ justifyContent: "flex" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            dropDownMaxHeight={1000}
            searchable={true}
            searchablePlaceholder="Search for a time zone"
            placeholder="Please select a time zone!"
            placeholderStyle={{ fontWeight: "bold" }}
            onChangeItem={(item) => console.log(item.label, item.value)}
          />
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
