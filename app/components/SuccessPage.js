import React from 'react'
import {Text, View,Button} from 'react-native'

const SuccessPage = ({navigation}) => {

    return (

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: '100'}}>Registration Successful!</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Button title={'Go to Home'} onPress={() => navigation.navigate("Events")}/>
            </View>
        </View>
    )
}

export default SuccessPage