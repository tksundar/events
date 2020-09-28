import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

class Spinner extends Component {
  render() {
    return (
      <View style={styles.container }>
      <ActivityIndicator />
      <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  },

});

export default Spinner;