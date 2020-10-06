/**
 * Created by tksrajan@gmail.com on
 */

import React,{useState} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import {TextInput} from "react-native-paper";
import Registrations from "./Registrations";
import styles from "../styles/Styles";
import HeaderNavigationBar from "./HeaderNavigationBar";
import PasswordInput from "./PasswordInput";

const ViewRegistrations = (props)=>{

    const {route,navigation} = props
    const [admin,setAdmin] = useState(false)
    const [username,setUsername] = useState('')
    const [pwd,setPwd] = useState('')
    const [error,setError] = useState('')
    const {event_name} = route

    const handleSubmit = ()=>{
    }

     const Header= ()=>{
        return(
            <View style={styles.topBanner}>
                <View
                    style={{
                        alignItems: 'flex-start',
                        width: '10%'
                    }}><HeaderNavigationBar {...navigation}/></View>
                <View style={{alignItems: 'flex-end'}}>
                    <Text style={{color: 'white', fontSize: 20, marginLeft: '70%'}}>Events</Text>
                </View>
            </View>
        )
     }
    const getElement = ()=>{
        if(admin){
            return (
                <>
                    <Header/>
                    <Registrations event_name={event_name}/>
                </>
            )
        }else{
            return ( <>
                     <View style={{alignItems:'center'}}><Text style=
                                                               {{fontSize:20}}>View Registrations</Text></View>
                     <View style={{marginTop:40 , alignItems:'center'}}>
                         <Text style={{textAlign:'center'}}>If you are admin for the {event_name}, please login</Text>
                         <TextInput style={styles.item1} label='Username' onChangeText={(text)=>
                         setUsername({username:text})}/>
                         <PasswordInput style={styles.item1} lable="password" onChangeText = {(text)=>
                             setPwd({pwd:text})}/>
                     </View>
                       <View style={{marginTop:20 , alignItems:'center'}}>
                    <TouchableOpacity style={styles.appButtonContainer1} onPress={handleSubmit}>
                        <Text style={{fontSize: 20, color: 'blue',textAlign:'center'}}>Login</Text>
                    </TouchableOpacity>
                       </View>
                </>
            )
        }
    }
    return(
            getElement()
    )
}

export default ViewRegistrations

