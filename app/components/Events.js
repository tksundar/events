import React, {useEffect, useState} from 'react'
import {Button, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {getRemoteData} from './Util';
import {URL_CHECK_USER, URL_EVENTS} from './Constants'
import Spinner from "./Spinner";
import styles from "../styles/Styles";
import {TextInput} from "react-native-paper";


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'row',
//         flexWrap: 'nowrap',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: "95%",
//         height: 20,
//         margin: 5
//     },
//     item: {
//         width: '40%',
//         marginLeft: 10
//     },
//     button: {
//         width: "20%",
//         alignItems: 'stretch',
//     },
//     link: {
//         width: '50%',
//         margin: 20,
//         color: 'blue',
//
//     },
//     clrGrey: {
//         backgroundColor: "#d9e3f0"
//     },
//     clrCyan: {
//         backgroundColor: "white"
//     },
//     rowStyle: {
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         margin: 10
//     }
//
// })
export const EventDetail = ({route, navigation}) => {

    console.log(route.params)
    const {event, username} = route.params
    const {event_name, event_venue, event_admin, event_date, event_time, event_description, event_link} = event
    const [registration, setRegistration] = useState([])

    const checkRegistration = async () => {

        let formData = new FormData();
        formData.append('name', username.username);
        formData.append('event_name', event.event_name);
        const response = await getRemoteData(URL_CHECK_USER, formData);
        console.log("CheckRegistration =>", response.data)
        if (response.data.name === username.username) {
            setRegistration(response.data)
        }
    }

    useEffect(() => {
        checkRegistration(registration)
    }, [])

    const keys = Object.keys(event);
    const rows = [];

    const fetchUrl = () => {
        Linking.openURL(event_link)
    }

    keys.forEach((key, index) => {
        let backgroundColor = 'white';
        if (index % 2 === 0) {
            backgroundColor = 'lightgrey'
        }

        let textStyle = styles.url;
        let fn = fetchUrl;
        let rowName = key
        if (key === 'event_link') {
            rowName = 'Event Link'
            textStyle = styles.link;

        }
        let row = <View key={index} style={{
            flex: 1,
            flexDirection: 'row',
            flexGrow: 1,
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: "95%",
            backgroundColor: backgroundColor
        }}>
            <Text style={styles.url}>{rowName}</Text>
            <Text style={textStyle} onPress={fn}>{event[key]}</Text>
        </View>
        console.log('name:value,row', key, event[key], row)
        rows.push(row)

    });


    return (
        <>
            <View style={{flex: 0.04, backgroundColor: 'rgb(20,20,20)', flexDirection: 'row',flexGrow:0.04}}>
                <Text style={{color: 'white', textAlign: 'left',width:'40%'}}>{event_name}</Text>
                <Text style={{color: 'white', textAlign: 'right',marginRight:15,width : '56%'}}>{username.username}</Text>
            </View>
            <View style={{
                flex: 0.8,
                justifyContent: "space-around",
                alignItems: 'center',
                margin: "3%",
                backgroundColor: '#ffffff'
            }}>

                <View style={[styles.container, styles.clrGrey]}>
                    <Text style={styles.url}>Event Name</Text>
                    <Text style={styles.url}>{event_name}</Text>
                </View>
                <View style={[styles.container, styles.clrCyan]}>
                    <Text style={styles.url}>Event Venue</Text>
                    <Text style={styles.url}>{event_venue}</Text>
                </View>
                <View style={[styles.container, styles.clrGrey]}>
                    <Text style={styles.url}>Event Date</Text>
                    <Text style={styles.url}>{event_date}</Text>
                </View>
                <View style={[styles.container, styles.clrCyan]}>
                    <Text style={styles.url}>Event time</Text>
                    <Text style={styles.url}>{event_time}</Text>
                </View>
                <View style={[styles.container, styles.clrGrey]}>
                    <Text style={styles.url}>Event Description</Text>
                    <Text style={styles.url}>{event_description}</Text>
                </View>
                <View style={[styles.container, styles.clrCyan]}>
                    <Text style={styles.url}>Event Admin(s)</Text>
                    <Text style={styles.url}>{event_admin}</Text>
                </View>
                <View style={[styles.container, styles.clrGrey]}>
                    <Text style={styles.url}>Venue Link</Text>
                    <Text style={styles.link}
                          onPress={() => Linking.openURL(event_link)}>{event_link}</Text>
                </View>
                <View style={styles.container}>
                    <View style={{margin: 10,flexDirection:'row'}}>
                        <TouchableOpacity  style={styles.appButtonContainer} onPress={() => {
                            if (registration.name === username.username) {
                                navigation.navigate('RegistrationDetails', registration)
                            } else {
                                navigation.navigate("EventRegistration", {'event': event, 'username': username.username})
                            }
                        }}><Text style={styles.appButtonText}>Register</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.appButtonContainer}
                                          onPress={() => navigation.navigate("ShowMedia", {"event":event,"username":username.username})}>
                            <Text style={styles.appButtonText}>View Media</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.appButtonContainer}
                                          onPress={() => navigation.navigate("UploadMedia", {"event":event,"username":username.username})}>
                            <Text style={styles.appButtonText}>Upload Media</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.appButtonContainer}
                                          onPress={() => navigation.navigate("ViewProgram", {"event":event,"username":username.username})}>
                            <Text style={styles.appButtonText}>View Program</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        </>
    )

}

export const Events = ({route, navigation}) => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const {username} = route.params;

    const fetchEvents = async () => {
        const response = await getRemoteData(URL_EVENTS)
        if (response.status === 200) {
            console.log(response.data);
            setEvents(response.data);
            setLoading(false);
        } else {
            console.log('Error retrieving events data');
        }
    }

    useEffect(() => {
        fetchEvents(events)
    }, [])

    // onPress={navigation.navigate('EventDetail',e)}

    const element = events.map((e, index) => {
        return (
            <View key={index} style={{flexDirection: 'row', alignItems: 'center',}}>

                <Text style={{color: 'green', fontWeight: 'bold'}}>{index + 1})</Text>
                <TouchableOpacity>
                    <Text style={styles.link}
                          onPress={() => navigation.navigate("EventDetail", {
                              'event': e,
                              'username': {username}
                          })}>{e.event_name}</Text>
                </TouchableOpacity>
            </View>

        )
    })

    const getElement = () => {
        if (loading === true) {
            return (

                <Spinner/>

            )
        } else {
            return (
                <>
                    <View style={{flex: 1}}>
                        <View style={{backgroundColor: '#000', flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{height:20,color: 'white', fontSize:15,marginRight: 15}}>{username}</Text>
                        </View>
                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', margin: 20}}>
                            {element}
                        </View>
                    </View>
                </>
            )
        }
    }
    return (
        getElement()
    )
}

