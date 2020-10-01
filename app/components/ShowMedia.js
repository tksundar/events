import React, {useEffect, useState} from 'react'
import {getRemoteData} from './Util'
import {Image, ScrollView, Text, View,TouchableOpacity} from 'react-native'
import {URL_DISPLAY_MEDIA, URL_PREFIX} from './Constants'
import Spinner from "./Spinner";
import {SafeAreaView} from "react-native-safe-area-context";

const ShowMedia = ({route, navigation}) => {

    const event = route.params
    const {event_name} = event
    const [urls, setUrls] = useState([])
    const [loading, setLoading] = useState(true)
    console.log(event)

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
        let picture = <TouchableOpacity key={i}><Image
                             source={{uri: destination}}
                             style={{height: 200,width:200, resizeMode: 'contain', margin: 5}}
                             onPress={()=>navigation.navigate('FullSizePhoto',{'destination':destination})}
        /></TouchableOpacity>

        pictures.push(picture)
        console.log(picture)
    }

    const getElement = () => {
        if (loading === true) {
            return (<Spinner/>)
        } else {
            return (
                <>
                    <View style={{
                        backgroundColor: '#2196F3',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        margin: 10
                    }}>
                        <Text style={{color: 'white', alignItems: 'flex-end', fontSize: 20, margin: 10}}>Events
                            App</Text>
                    </View>
                    <SafeAreaView style={{justifyContent:'center',alignItems:'center'}}>
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