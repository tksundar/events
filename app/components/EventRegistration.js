
import React,{useState,useEffect} from 'react'
import {View , Text, Button,StyleSheet, Linking } from 'react-native'
import { color } from 'react-native-reanimated';
import { getRemoteData } from './Util';

const EventRegistration = ({route,navigation}) =>{

    const eventDetail = route.params
   
    return(
        <>
        <View style={{justifyContent:"flex-start" , backgroundColor:'grey' , color:'white'}}>
        <Text style={{color:'white',fontSize:20}}>Registration for {eventDetail.event_name}</Text>
        </View> 
        </>
    )

}

export default EventRegistration