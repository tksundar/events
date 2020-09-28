import React from 'react'
import axios from 'axios'

export const getRemoteData = async (url, data) => {
    console.log("getting data from remote url and formdata ", url, data)

    try {
        if (data === undefined) {
            console.log('No form Data. Calling GET')
            return await axios.get(url);
        } else {
            console.log('Sending POST request')
            return await axios.post(url, data)
        }
    } catch (error) {
        console.log('error receiving response, ', error)
        return {'Error': error}
    }

}