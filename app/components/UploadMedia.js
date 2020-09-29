import React, {useEffect, useState} from 'react'
import DocumentPicker from 'react-native-document-picker';
import {getRemoteData} from './Util'
import {Button,Text, View} from 'react-native'
import {URL_UPLOAD_MEDIA, URL_PREFIX} from './Constants'
import Spinner from "./Spinner";
import {exp} from "react-native-reanimated";

export const UploadMedia = () => {


    const [imageArray, setImageArray] = useState([])



    const selectMedia = async () => {

        try {
            const images = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.images],
            });
            setImageArray(images);
            console.log(images)
            //upload now

        } catch (e) {
            if (DocumentPicker.isCancel(err)) {
                alert('Upload cancelled by user')
            } else {
                throw err;
            }
        }
    }

    const selectedMedia = []

    for(let i=0;i<imageArray.length;i++){
        selectedMedia.push(<Text>imageArray[i].uri</Text>)
    }


    return(
        <>
            <View style={{justifyContent:'center',
                    margin:20}}>
                <Button  title={'Select Images to Upload'} onPress={selectMedia}/>
            </View>

            <View style={{justifyContent:'center',
                    margin:20}}>
                <Text>You selected the following:</Text>
                {selectedMedia}
            </View>
            </>

    )

}

export default UploadMedia