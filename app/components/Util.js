import React from 'react'
import axios from 'axios'

export const getRemoteData = async (url, data) => {
    console.log("getting data from remote url and form-data ", url, data)

    try {
        if (data === undefined) {
            console.log('No form Data. Calling GET')
            const response = await axios.get(url);
            log(response,url)
            return response
        } else {
            console.log('Sending POST request')
            const response = await axios.post(url, data, {timeout: 60000})
             log(response,url)
            return response
        }
    } catch (error) {
        console.log('error receiving response, ', error)
        return {'Error': error}
    }

}

const log = (response,url) =>{
       console.log('received response for request ',url)
       console.log(response.status)
       console.log(response.data)
}