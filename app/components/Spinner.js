import React, {Component} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";

class Spinner extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{color:'green'}}>Processing...</Text>
                <ActivityIndicator/>
                <ActivityIndicator size="large" color="green"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },

});

export default Spinner;