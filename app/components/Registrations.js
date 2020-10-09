import React from 'react'
import {Text, View} from 'react-native'
import styles from "../styles/Styles";
import {Button} from "react-native-paper";


const Registrations = (props) =>{
    const {route,navigation} = props
    const {registrations,username,event_name} = route.params
    console.log('No of Registrations',registrations.length)
    console.log('username',username)
    console.log('event',event_name)
   const elements = registrations.map((item,index)=>{
       let date = item.arrival_date
       return (
                <View key={index} style={{margin: 5}}>
                    <View key ={index} style={{flexDirection: 'row'}}>
                        <Text style={{width: '20%', textAlign: 'center'}}>{item.name}</Text>
                        <Text style={{width: '20%', textAlign: 'center'}}>{item.payment_amount}</Text>
                        <Text style={{width: '20%', textAlign: 'center'}}>{item.payment_ref}</Text>
                        <Text style={{width: '15%', textAlign: 'center'}}>{date.substring(2,date.length)}</Text>
                        <Text style={{width: '10%', textAlign: 'center'}}>{item.arrival_time.substring(0, 5)}</Text>
                        <Text style={{width: '15%', textAlign: 'center'}}>{item.pickup}</Text>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'grey', marginTop: 5}}/>
                </View>

        )
   })
    return(
        <>
             <View style={styles.topBanner}>
                        <View style={{
                            alignItems: 'center',
                            width: '100%'
                        }}><Button mode={'contained'} onPress={()=>navigation.navigate('Login')}>Home</Button></View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={{color: 'white', fontSize: 20, marginLeft: '70%'}}>Events</Text>
                        </View>
                    </View>
            <View style={{margin: 5}}>

                <View style={{flexDirection: 'row', backgroundColor: '#0a0a0a'}}>
                    <Text style={{textAlign:'center',width: '20%', fontWeight: 'bold', color: '#fff'}}>Name</Text>
                    <Text style={{textAlign:'center',width: '20%', fontWeight: 'bold', color: '#fff'}}>Payment</Text>
                    <Text style={{textAlign:'center',width: '20%', fontWeight: 'bold', color: '#fff'}}>Payment Ref</Text>
                    <Text style={{textAlign:'center',width: '15%', fontWeight: 'bold', color: '#fff'}}>Arrival</Text>
                    <Text style={{textAlign:'center',width: '10%', fontWeight: 'bold', color: '#fff'}}>Time</Text>
                    <Text style={{textAlign:'center',width: '15%', fontWeight: 'bold', color: '#fff'}}>Pickup</Text>
                </View>
            </View>
            {elements}
        </>
    )
}

export default Registrations