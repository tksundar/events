import React, {useEffect, useState} from 'react'
import {Button, Linking, StyleSheet, Text, View} from 'react-native'
import {getRemoteData} from './Util';
import {URL_CHECK_USER, URL_EVENTS} from './Constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "95%"
    },
    item: {
        width: '40%',
        marginLeft: 10
    },
    button: {
        width: "50%",
        margin: 20,
        alignItems: 'stretch',
        alignSelf: "center"
    },
    link: {
        width: '50%',
        margin: 20,
        color: 'blue',

    },
    clrGrey: {
        backgroundColor: "#d9e3f0"
    },
    rowStyle: {
        flexDirection: 'row',
        margin: 10
    }

})
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
        if (index % 2 === 0){
            backgroundColor = 'lightgrey'
        }

        let textStyle = styles.item;
        let fn= fetchUrl;
        let rowName= key
        if(key === 'event_link'){
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
             backgroundColor:backgroundColor}}>
            <Text style={styles.item}>{rowName}</Text>
            <Text style={textStyle} onPress={fn}>{event[key]}</Text>
        </View>
        console.log('name:value,row', key, event[key], row)
        rows.push(row)

    });


    return (
        <>
             <View style={{backgroundColor:'#2196F3', flexDirection:'row',justifyContent: 'flex-end'}}>
                    <Text style={{color:'white',alignItems:'flex-end'}}>Events App</Text>
                </View>
             <View style={{backgroundColor:'#2196F3', flexDirection:'row',justifyContent: 'flex-end'}}>
                    <Text style={{color:'white',alignItems:'flex-end'}}>{username.username}</Text>
                </View>
            <View style={{flex: 1, justifyContent: "space-around", alignItems:'center', margin: "5%"}}>
                <View style={[styles.container, styles.clrGrey]}>
                    <Text style={styles.item}>Event Name</Text>
                    <Text style={styles.item}>{event_name}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.item}>Event Venue</Text>
                    <Text style={styles.item}>{event_venue}</Text>
                </View>
                <View style={[styles.container, styles.clrGrey]}>
                    <Text style={styles.item}>Event Date</Text>
                    <Text style={styles.item}>{event_date}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.item}>Event time</Text>
                    <Text style={styles.item}>{event_time}</Text>
                </View>
                <View style={[styles.container, styles.clrGrey]}>
                    <Text style={styles.item}>Event Description</Text>
                    <Text style={styles.item}>{event_description}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.item}>Event Admin(s)</Text>
                    <Text style={styles.item}>{event_admin}</Text>
                </View>
                <View style={[styles.container, styles.clrGrey]}>
                    <Text style={styles.item}>Venue Link</Text>
                    <Text style={styles.link}
                          onPress={() => Linking.openURL(event_link)}>{event_link}</Text>
                </View>
                <View style={[styles.button, styles.rowStyle]}>
                    <View style={{margin: 10}}>
                        <Button title="Register" onPress={() => {
                            if (registration.name === username.username) {
                                navigation.navigate('RegistrationDetails', registration)
                            } else {
                                navigation.navigate("EventRegistration", {'event': event, 'username': username})
                            }
                        }}/>
                    </View>
                    <View style={{margin: 10}}>
                        <Button title="View Media" onPress={() => navigation.navigate("ShowMedia", event)}/>
                    </View>
                </View>
            </View>
        </>
    )

}

export const Events = ({route, navigation}) => {

    const [events, setEvents] = useState([]);
    const {username} = route.params

    const fetchEvents = async () => {
        const response = await getRemoteData(URL_EVENTS)
        if (response.status === 200) {
            console.log(response.data)
            setEvents(response.data)
        } else {
            console.log('Error retrieving events data')
        }
    }

    useEffect(() => {
        fetchEvents(events)
    }, [])

    // onPress={navigation.navigate('EventDetail',e)}

    const element = events.map((e, index) => {
        return (
            <View key={index} style={{flexDirection: 'row', alignItems: 'center', }}>

                <Text style={{backgroundColor:'#d9e3f0'}}>{index + 1})</Text><Text style={styles.link} onPress={() => navigation.navigate("EventDetail", {
                'event': e,
                'username': {username}
            })}>{e.event_name}</Text>
            </View>

        )
    })

    return (
        <>
             <View style={{backgroundColor:'#2196F3', flexDirection:'row',justifyContent: 'flex-end'}}>
                    <Text style={{color:'white',alignItems:'flex-end'}}>Events App</Text>
                </View>
             <View style={{backgroundColor:'#2196F3', flexDirection:'row',justifyContent: 'flex-end'}}>
                    <Text style={{color:'white',alignItems:'flex-end'}}>{username}</Text>
                </View>
        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', margin: 20}}>
            <Text style={{alignItems: 'flex-end'}}>{username.username}</Text>
            {element}
        </View>
            </>
    )
}

