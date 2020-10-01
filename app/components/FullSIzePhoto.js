import React from 'react'
import {Image, Text, View,StyleSheet} from 'react-native'
import ProgressiveImage from "./ProgressiveImage";

const FullSizePhoto = ({route,navigation})=>{

    const {destination} = route.params



    return (
        <>
            <View style={{backgroundColor: '#2196F3', flexDirection: 'row', justifyContent: 'flex-end',}}>
                <Text style={{color: 'white', alignItems: 'flex-end', fontSize: 20, margin: 10}}>Events App</Text>
            </View>
            <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                <ProgressiveImage
                       source={{uri: destination}}
                       style={{resizeMode: 'stretch', margin: 5}}/>

            </View>
        </>
    )
}
export default FullSizePhoto