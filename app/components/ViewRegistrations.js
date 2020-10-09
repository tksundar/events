/**
 * Created by tksrajan@gmail.com on
 */

import React,{useState} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import {TextInput,Button} from "react-native-paper";
import Registrations from "./Registrations";
import styles from "../styles/Styles";
import HeaderNavigationBar from "./HeaderNavigationBar";
import PasswordInput from "./PasswordInput";
import {URL_CHECK_ADMIN} from "./Constants";
import {getRemoteData} from "./Util";
import Spinner from "./Spinner";
import TopBanner from "./TopBanner";

const ViewRegistrations = ({route,navigation})=>{

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    const {event_name} = route.params


    const handleSubmit = async ()=>{
         let data = new FormData();
         data.append('username',username.username)
         data.append('password',password.password)
         data.append('event_name',event_name)
         const response = await getRemoteData(URL_CHECK_ADMIN,data)
        if(response.status === 200){
            if (response.data.status !== "invalid"){
                setLoading(true)
                navigation.navigate("Registrations", {
                    "registrations" : response.data,
                    "username" : username.username,
                    "event_name": event_name
                })
            }else{
                setError("You are not authorised to view this page")
            }
        }else{
            console.log('status code =', response.status)
            setError("Server error")
        }

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
        if(loading){
            return (
             <>
                    <TopBanner/>
                   <Spinner/>
                </>
            )
        }else{
            return ( <>
                     <View style={{alignItems:'center',marginTop :'10%'}}><Text style=
                                                               {{fontSize:20}}>View Registrations</Text></View>
                     <View style={{marginTop:40 , alignItems:'center'}}>
                         <Text style={{textAlign:'center'}}>If you are admin for the {event_name}, please login</Text>
                         <TextInput style={styles.item1} label='Username' onChangeText={(text)=>
                         setUsername({username:text})}/>
                         <PasswordInput style={styles.item1} lable="password" onChangeText = {(text)=>
                             setPassword({password:text})}/>
                     </View>
                       <View style={{marginTop:20 , alignItems:'center'}}>
                    <Button mode={'outlined'} onPress={handleSubmit}>Submit</Button>
                       </View>
                    <View><Text style={{color:'red'}}>{error}</Text></View>
                </>
            )
        }
    }
    return(
            getElement()
    )
}

export default ViewRegistrations

