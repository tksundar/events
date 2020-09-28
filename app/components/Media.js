import React, {useEffect, useState} from 'react'
import {getRemoteData} from './Util'
import {Image, ScrollView, Text, View} from 'react-native'
import {URL_DISPLAY_MEDIA, URL_PREFIX} from './Constants'

export const ShowMedia = ({route, navigation}) => {

    const event = route.params
    const {event_name} = event
    const [urls, setUrls] = useState([])
    console.log(event)

    const getUrls = async () => {
        let formData = new FormData();
        formData.append('event_name', event_name)
        const response = await getRemoteData(URL_DISPLAY_MEDIA, formData)
        if (response.status === 200) {
            setUrls(response.data)
        }
    }
    useEffect(() => {
        getUrls()
    }, [])

    const pictures = [];

    for (let i = 0; i < urls.length; i++) {
        let destination = URL_PREFIX + urls[i];
        console.log('---', destination)
        let picture = <Image key={i} source={{uri: destination}}
                             style={{height: 200, resizeMode: 'stretch', margin: 5}}/>

        pictures.push(picture)
        console.log(picture)
    }

    return (
        <>
            <View style={{backgroundColor: '#2196F3', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{color: 'white', alignItems: 'flex-end'}}>Events App</Text>
            </View>
            <ScrollView>
                {pictures}
            </ScrollView>
        </>
    )

}

export const UploadMedia = () => {

}