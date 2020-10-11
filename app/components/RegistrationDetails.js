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
            <View>

            <View key={key} style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 10}}>
                   <Text
                        style={{width: '50%',  fontFamily: 'Verdana', fontWeight: 'bold'}}>{key}:</Text>
                    <Text style={{width: "50%",  fontFamily: 'Verdana'}}>{registration[key]}</Text>
            </View>
 <View style={{width: '100%', height: 1, backgroundColor: 'grey', marginTop: 5}}/>

                </View>

        rows.push(row)

    });

    return (
        <>
            <View style={{backgroundColor: 'rgb(ff,ff,ff)', flex: 1}}>
                  <Text style={{color: 'white', textAlign:'right',marginRight: 15,width : '96%'}}>{registration.name}</Text>
                <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Text style={{fontSize: 15,fontWeight:'bold'}}>Your registration details are given below</Text>
                </View>

                <View style={{margin: 40,flex:0.6,borderColor:'grey',borderWidth:2}}>
                    {rows}
                </View>
            </View>
        </>
    )
}

export default RegistrationDetails
