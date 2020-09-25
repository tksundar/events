
import React,{useState,useEffect} from 'react'
import {View , Text, Button,StyleSheet, Linking } from 'react-native'
import { color } from 'react-native-reanimated';
import { getRemoteData } from './Util';

const EventRegistration = ({route,navigation}) =>{

    const eventDetail = route.params

    const styles = StyleSheet.create({
        hflex:{
            flex:1,
            flexDirection:'row',
            margin: 5,
            alignItems: "flex-start",
            justifyContent: "space-evenly"
        },

        vFlex:{
            flexDirection:'column',
           
            justifyContent:'space-evenly'
        },

        banner:{
          flex:0.2,
          justifyContent:'center',
          backgroundColor: 'grey' ,
          alignItems:'flex-end',
          margin:10,
        },
        item:{
            height: 40,
            width: 200, 
            borderColor: 'gray',
            borderWidth: 1
        },
    })

   
    return(
        <>
        <View style={{justifyContent:"flex-start" , backgroundColor:'grey' , color:'white'}}>
        <Text style={{color:'white',fontSize:20}}>Registration for {eventDetail.event_name}</Text>
        </View> 
        </>
    )

}

export default EventRegistration