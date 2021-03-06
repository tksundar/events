import React, {useEffect, useState} from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Button} from 'react-native-paper'
import {getRemoteData} from './Util';
import {URL_CHECK_USER, URL_EVENTS} from './Constants'
import Spinner from "./Spinner";
import styles from "../styles/Styles";

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
        console.log("CheckRegistration =>", response.status)
        if(response.status === 200) {
            if (response.data.name === username.username) {
                setRegistration(response.data)
            }
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
            <View style={{flex: 0.04, backgroundColor: 'rgb(20,20,20)', flexDirection: 'row',}}>
                <Text style={{color: 'white', textAlign: 'left',width:'40%'}}>{event_name}</Text>
                <Text style={{color: 'white', textAlign: 'right',marginRight:15,width : '56%'}}>{username.username}</Text>
            </View>
            <View style={{
                flex: 0.8,
                justifyContent: "space-around",
                alignItems: 'center',
                margin: "5%",
                backgroundColor: '#ffffff'
            }}>

                <View style={[styles.container, ]}>
                    <Text style={styles.eventItem}>Event Name</Text>
                    <Text style={styles.itemValue}>{event_name}</Text>
                </View>
                 <View style={{width: '100%', height: 1, backgroundColor: 'grey', marginTop: 5}}/>
                <View style={[styles.container,]}>
                    <Text style={styles.eventItem}>Event Venue</Text>
                    <Text style={styles.itemValue}>{event_venue}</Text>
                </View>
                 <View style={{width: '100%', height: 1, backgroundColor: 'grey', marginTop: 5}}/>
                <View style={[styles.container,]}>
                    <Text style={styles.eventItem}>Event Date</Text>
                    <Text style={styles.itemValue}>{event_date}</Text>
                </View>
                 <View style={{width: '100%', height: 1, backgroundColor: 'grey', marginTop: 5}}/>
                <View style={styles.container }>
                    <Text style={styles.eventItem}>Event Time</Text>
                    <Text style={styles.itemValue}>{event_time}</Text>
                </View>
                 <View style={{width: '100%', height: 1, backgroundColor: 'grey', marginTop: 5}}/>
                <View style={[styles.container, ]}>
                    <Text style={styles.eventItem}>Event Description</Text>
                    <Text style={styles.itemValue}>{event_description}</Text>
                </View>
                 <View style={{width: '100%', height: 1, backgroundColor: 'grey', marginTop: 5}}/>
                <View style={[styles.container, ]}>
                    <Text style={styles.eventItem}>Event Admin(s)</Text>
                    <Text style={styles.itemValue}>{event_admin}</Text>
                </View>
                 <View style={{width: '100%', height: 1, backgroundColor: 'grey', marginTop: 5}}/>
                <View style={[styles.container, ]}>
                    <Text style={styles.eventItem}>Venue Link</Text>
                    <Text style={styles.link}
                          onPress={() => Linking.openURL(event_link)}>{event_link}</Text>
                </View>
                 <View style={{width: '100%', height: 1, backgroundColor: 'grey', marginTop: 5}}/>
                <View style={styles.container}>
                    <View style={{margin: 10,flexDirection:'row'}}>
                        <TouchableOpacity  style={styles.appButtonContainer1} onPress={() => {
                            if (registration.name === username.username) {
                                navigation.navigate('RegistrationDetails', registration)
                            } else {
                                navigation.navigate("EventRegistration", {'event': event, 'username': username.username})
                            }
                        }}><Text style={styles.appButtonText2}>Register</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.appButtonContainer1}
                                          onPress={() => navigation.navigate("ShowMedia", {"event":event,"username":username.username})}>
                            <Text style={styles.appButtonText2}>View Media</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.appButtonContainer1}
                                          onPress={() => navigation.navigate("UploadMedia", {"event":event,"username":username.username})}>
                            <Text style={styles.appButtonText2}>Upload Media</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.appButtonContainer1}
                                          onPress={() => navigation.navigate("ViewProgram", {"event":event,"username":username.username})}>
                            <Text style={styles.appButtonText2}>View Program</Text>
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



    const element = events.map((e, index) => {
        return (

            <View key={index} style={{alignItems: 'center', width: '100%'}}>
               <Button mode={'outlined'} onPress={() => navigation.navigate("EventDetail", {
                              'event': e,
                              'username': {username}
               })}>{e.event_name}</Button>

                <View style={{width: '100%', height: 1, backgroundColor: 'grey', margin: 10}}/>
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

