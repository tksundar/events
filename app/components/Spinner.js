import React, {Component} from 'react'
import {ActivityIndicator, StyleSheet, Image, View} from 'react-native'

class Spinner extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={{width: 100, height: 50}}  source ={require('../images/giphy.gif')}/>
                <ActivityIndicator/>
                <ActivityIndicator size="large" color="green"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:'center'
    },

});

export default Spinner;
