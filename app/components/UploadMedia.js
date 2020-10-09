import React, {useState} from 'react'
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios'
import {Text, View,TouchableOpacity} from 'react-native'

import {URL_UPLOAD_MEDIA} from './Constants'
import Spinner from "./Spinner";
import {ProgressBar} from '@react-native-community/progress-bar-android'
import styles from "../styles/Styles";
import {Button} from "react-native-paper";


export const UploadMedia = ({route, navigation}) => {


    const {event,username} = route.params
    console.log('upload media:',event,username)
    const [images, setImages] = useState([])
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
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

        const config = {
            onUploadProgress: function (progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setProgress(percentCompleted / 100)
                console.log('completed percentage ', percentCompleted / 100)
            },
            headers: {"content-type": "multipart/form-data", "accept": "application/json"}

        }

        data.append('event_name', event.event_name)
        console.log(data)
        try {
            setUploading(true)
            const response = await axios.post(URL_UPLOAD_MEDIA, data, config)
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
                    <View style={{flex: 0.04, backgroundColor: 'rgb(20,20,20)', flexDirection: 'row',flexGrow:0.04}}>
                <Text style={{color: 'white', textAlign: 'left',width:'40%'}}>{event.event_name}</Text>
                <Text style={{color: 'white', textAlign: 'right',width : '56%'}}>{username}</Text>
            </View>
                    <View style={{flex: 0.8}}>
                        <Spinner/>
                        <ProgressBar
                            styleAttr="Horizontal"
                            indeterminate={false}
                            progress={progress}
                        />
                    </View>
                </>
            )
        } else {
            return (
                <>
                   <View style={{flex: 0.04, backgroundColor: '#000', flexDirection: 'row',flexGrow:0.04}}>
                <Text style={{color: 'white', textAlign: 'left',width:'40%'}}>{event.event_name}</Text>
                <Text style={{color: 'white', textAlign: 'right',width : '60%'}}>{username}</Text>
            </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', flex: 0.5}}>
                        <View style={{width: 200, margin: 25}}>
                            <Button mode={'contained'} onPress={selectMedia}>
                               Select Images
                            </Button>
                        </View>

                        <View style={{width: 200, margin: 25}}>
                            <Text style={{margin: 10}}>You selected the following:</Text>
                            {imageMeta}
                             <Button mode='contained' onPress={upload}>
                                Upload Images
                            </Button>
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