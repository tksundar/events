import React from 'react'
import {Text, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'

const RegistrationDetails = ({route, navigation}) => {

    console.log(route.params)
    const registration = route.params

    const keys = Object.keys(registration)


    const rows = []

    keys.forEach(key => {
        let row =
            <View key={key} style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', marginLeft: 10}}>
                <View style={{
                    backgroundColor: '#4059bf',
                    flexDirection: 'row', alignItems: 'flex-start', marginLeft: 10,
                    flexGrow: 1,
                }}>
                    <Text
                        style={{width: '50%', color: 'white', fontFamily: 'Verdana', fontStyle: 'normal'}}>{key}:</Text>
                    <Text style={{width: "50%", color: 'white', fontFamily: 'Verdana'}}>{registration[key]}</Text>
                </View>
            </View>

        rows.push(row)

    });

    return (
        <>
            <View style={{backgroundColor: 'rgb(ff,ff,ff)', flex: 1}}>
                  <Text style={{color: 'white', textAlign:'right',marginRight: 15,width : '96%'}}>{registration.name}</Text>
                <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Text style={{fontSize: 15}}>Already Registered. Details given below</Text>
                </View>

                <ScrollView style={{margin: 20}}>
                    {rows}
                </ScrollView>
            </View>
        </>
    )
}

export default RegistrationDetails