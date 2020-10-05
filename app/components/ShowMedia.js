import React, {useEffect, useState} from 'react'
import {getRemoteData} from './Util'
import {Image, ScrollView, Text, View} from 'react-native'
import {URL_DISPLAY_MEDIA, URL_PREFIX} from './Constants'
import Spinner from "./Spinner";
import {SafeAreaView} from "react-native-safe-area-context";
import Download from "./Download";

const ShowMedia = ({route, navigation}) => {

    const {event, username} = route.params
    const {event_name} = event
    const [urls, setUrls] = useState([])
    const [loading, setLoading] = useState(true)
    console.log("View media:",event,event_name)

    const getUrls = async () => {
        let formData = new FormData();
        formData.append('event_name', event_name)
        const response = await getRemoteData(URL_DISPLAY_MEDIA, formData)
        if (response.status === 200) {
            setUrls(response.data)
            setLoading(false)
        }
    }
    useEffect(() => {
        getUrls()
    }, [])

    const pictures = [];

    for (let i = 0; i < urls.length; i++) {
        let destination = URL_PREFIX + urls[i];
        console.log('---', destination)
        let picture = <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{uri: destination}}
                   style={{
                       borderColor: 'blue',
                       borderWidth: 1,
                       height: 200,
                       width: 200,
                       resizeMode: 'contain',
                       margin: 5,

                   }}
            />
            <Download uri={destination}/>
        </View>

        pictures.push(picture)
        console.log(picture)
    }

    const getElement = () => {
        if (loading === true) {
            return (<Spinner/>)
        } else {
            return (
                <>
                    <View style={{backgroundColor: 'rgb(20,20,20)', flexDirection: 'row', flexGrow: 0.04}}>
                        <Text style={{color: 'white', textAlign: 'left', width: '40%'}}>{event.event_name}</Text>
                        <Text style={{color: 'white', textAlign: 'right', width: '56%'}}>{username}</Text>
                    </View>
                    <SafeAreaView style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#0a0a0a'

                    }}>
                        <ScrollView>
                            {pictures}
                        </ScrollView>
                    </SafeAreaView>
                </>
            )
        }
    }

    return (

        getElement()
    )

}

export default ShowMedia