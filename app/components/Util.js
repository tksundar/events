import React from 'react'
import axios from 'axios'

export const getRemoteData = async (url, data)=>{
    console.log("getting data from remote url and formdata ",url,data)
   
    try{
        if (data === undefined){
            console.log('No form Data. Calling GET')
            const response = await axios.get(url);
            return response;
        }
        else{
            console.log('Sending POST request')
            const response = await axios.post(url,data)
            return response
        }
    }catch(error){
    console.log('error receiving resspone, ' , error)
    return {'Error':error}
    }

}