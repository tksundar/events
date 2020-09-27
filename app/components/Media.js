import React,{useState,useEffect} from 'react'
import { getRemoteData } from './Util'
import {Image,ScrollView} from 'react-native'

export const ShowMedia = ({route,navigation})=>{

    const event = route.params
    const {event_name} = event
    const [urls, setUrls] = useState([])
    const url = 'http://192.168.0.103:8000/events/'
    console.log(event)

    const getUrls = async ()=>{
        let action = 'display';
        let formData = new FormData();
        formData.append('event_name',event_name)
        const response = await getRemoteData(url+action,formData)
        console.log(response)
        if(response.status === 200){
            console.log(response)
            setUrls(response.data)
            console.log(urls)
        }
    }
    useEffect( () => {getUrls()},[] )

    const pictures = new Array();

    for(let i =0;i<urls.length;i++){
        let destination = url + urls[i];
        console.log('---',destination)
        let picture = <Image key={i} source={destination}  
        style = {{height: 200, resizeMode : 'stretch', margin: 5 }} />
        pictures.push(picture)
    }

    return(
      
         <ScrollView>
             {pictures}
         </ScrollView>
    )

}

export const UploadMedia = ()=>{

}