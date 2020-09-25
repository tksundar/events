import React, { useState } from 'react'
import {View, Button,Text,StyleSheet, TextInput} from 'react-native'
import { color } from 'react-native-reanimated';
import {getRemoteData} from './Util'

const NewUser = () =>{

    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [mobile,setMobile] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async()=>{
        console.log('HandleSubmit called with values ',username.username,email.email,
        password.password,confirmPassword.confirmPassword,mobile.mobile)
        if(username.username.length===0 ||
            password.password.length===0||
            mobile.mobile.length===0||
            email.email.length===0){
                setErrorMessage('All fields are required')
                return
            }
        if(password.password !== confirmPassword.confirmPassword){
            let errorMessage = 'Password and Confirm Password do not match'
            console.log(errorMessage)
            setErrorMessage(errorMessage)
            return
        }
        if (!(email.email.includes('@') && email.email.includes('.'))){
            let errorMessage = 'Please enter a valid email address!'
            console.log(errorMessage)
            setErrorMessage(errorMessage)
            return
        }
        
        const formData = new FormData();
        formData.append('username', username.username)
        formData.append('password',password.password)
        formData.append('email',email.email)
        formData.append('mobile',mobile.mobile)
        const response = await getRemoteData('http://192.168.0.104:8000/events/register',formData)  
        console.log(response.status, response.data)
        if(response.data.name===username.username){
            navigation.navigate('Events')
        }
        else if(response.data.status === 'existing'){
                setErrorMessage('User exisis. Please login. If you forgot your password, please contact your admin')
        }else{
                setErrorMessage('If you are seeing this, this is an application bug. Contact adminsitartor')
        }

        return  
        
    }

    const styles = StyleSheet.create({
        hflex:{
            flex:1,
            flexDirection:'row',
            margin: 5,
            alignItems: "flex-start",
            justifyContent: "space-evenly"
        },

        vFlex:{
            flexDirection:'column',
           
            justifyContent:'space-evenly'
        },

        banner:{
          flex:0.2,
          justifyContent:'center',
          backgroundColor: 'grey' ,
          alignItems:'flex-end',
          margin:10,
        },
        item:{
            height: 40,
            width: 200, 
            borderColor: 'gray',
            borderWidth: 1
        },
    })

return(
    <>

    {/* <View style={styles.banner}>
        <Text style={{color:'white',fontSize:20,fontWeight: "bold",margin:20}}>Events App</Text>
    </View> */}
    <View style={styles.vFlex}/>
        <View style={styles.hflex}>
            <View style={{alignItems:'flex-start',margin:5}}>
                <Text >Username</Text>
                <TextInput style={{height: 40,width: 200, borderColor: 'gray', borderWidth: 1}}
                placeholder="username" onChangeText={(text)=> setUsername({username:text})}/>
            </View>
            <View style={{alignItems:'flex-start',margin:5}}>
                <Text >Email Address</Text>
                <TextInput style={styles.item} placeholder="Email Address" onChangeText={(text)=> setEmail({email:text})}/>
            </View>
        </View>
        <View style={styles.hflex}>
        <View style={{alignItems:'flex-start',margin:5}}>
            <Text>Mobile</Text>
            <TextInput style={styles.item} placeholder="Mobile" onChangeText={(text)=> setMobile({mobile:text})}></TextInput>
        </View>
        </View>
        <View style={styles.hflex}>
        <View style={{alignItems:'flex-start',margin:5}}>
            <Text>Password</Text>
            <TextInput style={{height: 40, width: 200,borderColor: 'gray', borderWidth: 1}}
            placeholder='password' secureTextEntry={true} onChangeText={(text)=> setPassword({password:text})}/>
        </View>
        <View style={{alignItems:'flex-start',margin:5}}>
            <Text>Confirm Password</Text>
            <TextInput style={{height: 40, width: 200,borderColor: 'gray', borderWidth: 1}}
            placeholder='password' secureTextEntry={true} onChangeText={(text)=> setConfirmPassword({confirmPassword:text})}/>
        </View>
        </View>
        <View style={styles.hflex}>
            <View style={{alignItems:'flex-start'}}>
                <Button  title="Submit" onPress={handleSubmit}/>
            </View>
        </View>
        <View style={styles.hflex}>
            <View>
                <Text>{errorMessage}</Text>
            </View>
     </View> 
    </>
)
}
export default NewUser