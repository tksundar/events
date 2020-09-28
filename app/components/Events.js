import React, {useEffect, useState} from 'react'
import {Button, Linking, StyleSheet, Text, View} from 'react-native'
import {getRemoteData} from './Util';
import {URL_CHECK_USER,URL_EVENTS} from './Constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        marginLeft: 20,
        width: "95%"
    },
    item: {
        width: '20%',
        marginLeft: 20
    },
    button: {
        width: "50%",
        margin: 20,
        alignItems: 'stretch',
        alignSelf: "center"
    },
    link: {
        width: '50%',
        marginLeft: 20,
        color: 'blue',

    },
    clrGrey: {
        backgroundColor: "lightgrey"
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
        console.log("CheckRegistration =>",response.data)
        if (response.data.name === username.username) {
            setRegistration(response.data)
        }
    }

    useEffect(() => {
        checkRegistration(registration)
    }, [])

    return (
        <>
            <View style={{alignItems: 'flex-end', margin: 10}}><Text>{username.username}</Text></View>
            <View style={{flex: 1, justifyContent: "space-around", marginTop: "5%"}}>
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
            <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>{index + 1})</Text><Text style={styles.link} onPress={() => navigation.navigate("EventDetail", {
                'event': e,
                'username': {username}
            })}>{e.event_name}</Text>
            </View>

        )
    })

    return (
        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', margin: 20}}>
            <Text style={{alignItems: 'flex-end'}}>{username.username}</Text>
            {element}
        </View>
    )
}

