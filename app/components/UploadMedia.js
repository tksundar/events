import React, {useState} from 'react'
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios'
import {Button, Text, View} from 'react-native'

import {URL_UPLOAD_MEDIA} from './Constants'
import Spinner from "./Spinner";


export const UploadMedia = ({route, navigation}) => {


    const {event_name} = route.params
    const [images, setImages] = useState([])
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    const selectMedia = async () => {

        try {
            const selectedFiles = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.images],
            });
            setImages(selectedFiles);
            console.log(images)

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log(err)
            } else {
                throw err
            }

        }
    }

    const upload = async () => {
        const data: FormData = new FormData();
        images.forEach((image) => {
            data.append('file_url', {
                name: image.name,
                type: image.type,
                uri: image.uri
            })
        })

        data.append('event_name', event_name)
        console.log(data)
        const headers = {"content-type": "multipart/form-data", "accept": "application/json"}
        try {
            setUploading(true)
            const response = await axios.post(URL_UPLOAD_MEDIA, data, headers)
            setUploading(false)
            if (response.data !== undefined) {
                if (response.status === 200) {
                    console.log(response.data)
                    navigation.navigate('SuccessPage', {'message': 'Upload successful'})
                }
            } else {
                setError('File upload failed.Please try later')
                navigation.navigate('SuccessPage', {'message': 'Upload Failed. Please try later'})
            }
        } catch (e) {
            console.log('error=>', e.message)
            setError(e.message)

        }

    }

    const imageMeta = []
    for (let i = 0; i < images.length; i++) {
        let image = images[i]
        imageMeta.push(<Text key={i}>{image.name}: Size = {Math.round(image.size / 1000)} KB</Text>)
    }


    const getElement = () => {
        if (uploading) {
            return (
                <>
                    <View style={{backgroundColor: '#2196F3', flexDirection: 'row', justifyContent: 'flex-end',}}>
                        <Text style={{color: 'white', alignItems: 'flex-end', fontSize: 20, margin: 10}}>Events
                            App</Text>
                    </View>
                    <Spinner/>
                </>
            )
        } else {
            return (
                <>
                    <View style={{backgroundColor: '#2196F3', flexDirection: 'row', justifyContent: 'flex-end',}}>
                        <Text style={{color: 'white', alignItems: 'flex-end', fontSize: 20, margin: 10}}>Events
                            App</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', flex: 0.5}}>
                        <View style={{width: 200, margin: 25}}>
                            <Button title={'Select Images'} onPress={selectMedia}/>
                        </View>

                        <View style={{width: 200, margin: 25}}>
                            <Text style={{margin: 10}}>You selected the following:</Text>
                            {imageMeta}
                            <Button title={'Upload Images'} onPress={upload}/>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'red'}}>{error}</Text></View>
                </>
            )
        }
    }
    return (
        getElement()
    )

}

export default UploadMedia