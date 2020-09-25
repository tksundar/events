import React,{useState,useEffect} from 'react'
import {View , Text, Button,StyleSheet, Linking } from 'react-native'
import { color, event } from 'react-native-reanimated';
import { getRemoteData } from './Util';


export const EventDetail = ({route,navigation})=>{
 
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start' ,
        marginLeft: 20,
        alignItems:'center',
        width:"95%"
      },
      item: {
        width: '20%' ,
        marginLeft: 20
      },
      button:{
          width: "50%",
          margin: 20,
          alignItems:'stretch',
          alignSelf: "center"
      },
      link: {
        width: '50%' ,
        marginLeft: 20,
        color: 'blue',
       
      },
      clrGrey:{
          backgroundColor:"lightgrey"
      }
})
    
    // const keys = Object.keys(route.params)
    const {event_link} = route.params
    console.log(event_link)
    //const elements= Array()
    //console.log(keys)
   // console.log(route.params)

    return(

        <View style={{flex: 0.7,justifyContent:"space-around",marginTop:"5%"}}>
                <View style={[styles.container,styles.clrGrey]}>
                    <Text style={styles.item}>Event Name</Text>
                    <Text style={styles.item}>{route.params.event_name}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.item}>Event Venue</Text>
                    <Text style={styles.item}>{route.params.event_venue}</Text>
                </View>
                <View style={[styles.container,styles.clrGrey]}>
                    <Text style={styles.item}>Event Date</Text>
                    <Text style={styles.item}>{route.params.event_date}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.item}>Event time</Text>
                    <Text style={styles.item}>{route.params.event_time}</Text>
                </View>
                <View style={[styles.container,styles.clrGrey]}>
                    <Text style={styles.item}>Event Description</Text>
                    <Text style={styles.item}>{route.params.event_description}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.item}>Event Admin(s)</Text>
                    <Text style={styles.item}>{route.params.event_admin}</Text>
                </View>
                <View style={[styles.container,styles.clrGrey]}>
                    <Text style={styles.item}>Venue Link</Text>
                    <Text style={styles.link} 
                     onPress={()=>Linking.openURL(event_link)}>{event_link}</Text>
                </View>
            <View style={styles.button}>
            <Button title="Register" onPress={()=>navigation.navigate("EventRegistration",route.params)}></Button>
            </View>
        </View>
    )

}

export const Events = (props)=>{

    const [events,setEvents] = useState([]);
    
    const {navigation} = props

    
     const fetchEvents = async () => {
        const response = await getRemoteData('http://192.168.0.104:8000/events')
        if(response.status === 200){
            console.log(response.data)
            setEvents(response.data)
        }else{
            console.log('Error retrieving events data')
        }
    }

    useEffect( () => {fetchEvents(events)},[] )

    // onPress={navigation.navigate('EventDetail',e)}

    const element = events.map((e,index)=>{
        return (
            <View key={index} style={{ alignItems: 'center'}} >
                <Button title={e.event_name} onPress={()=>navigation.navigate("EventDetail",e)}></Button> 
            </View> 
        )
    })

    return(

        <View style={{flex: 0.5 , justifyContent:'space-around'}}>
            {element}
           </View>
    )
}

