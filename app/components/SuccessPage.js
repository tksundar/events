import React from 'react'
import {Button, Text, View} from 'react-native'

const SuccessPage = ({route, navigation}) => {

    console.log(route.params)
    const {message,username} = route.params
    let destination = "Events"
    if (username === undefined){
        destination = "Login"
    }
    return (

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: '100'}}>{message}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center',marginTop:50}}>
                <Button title={'Back'} onPress={() => navigation.navigate(destination)}/>
            </View>
        </View>
    )
}

export default SuccessPage