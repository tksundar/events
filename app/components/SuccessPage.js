import React from 'react'
import {Button, Text, View} from 'react-native'

const SuccessPage = ({route, navigation}) => {

    console.log(route.params)
    const {message} = route.params
    return (

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: '100'}}>{message}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Button title={'Go to Home'} onPress={() => navigation.navigate("Events")}/>
            </View>
        </View>
    )
}

export default SuccessPage