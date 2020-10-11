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

export const getDate = (date, mode) => {
        console.log('date , mode',date,mode)
        let final = ''
        if (mode === 'date') {
            let month = date.getUTCMonth() + 1
            if (month / 10 < 1) {
                month = '0' + month
            }
            let cDate = date.getUTCDate()
            if (cDate / 10 < 1) {
                cDate = '0' + cDate;
            }
            final = date.getFullYear() + '-' + month + '-' + cDate
        } else if (mode === 'time') {
            let hr = date.getHours()
            if (hr / 10 < 1) {
                hr = '0' + hr
            }
            let mts = date.getMinutes()
            if (mts / 10 < 1) {
                mts = '0' + mts
            }
            final = hr + ":" + mts + ":00"
        }

        return final
    }
