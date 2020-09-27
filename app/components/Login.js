import React, { useState } from 'react'
import {View, Button,Text,Stylesheet, TextInput} from 'react-native'
import { color } from 'react-native-reanimated';
import MenuComponent from './MenuComponent';
import {getRemoteData} from './Util'


const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [ error, setError] = useState('');
    const {navigation} = props

    const handleSubmit = async()=>{
        console.log('HandleSubmit called with values ',username.username,password.password)
        const formData = new FormData();
        formData.append('username', username.username)
        formData.append('password',password.password)
        const response = await getRemoteData('http://192.168.0.103:8000/events/login',formData)  
        console.log(response.status, response.data)
        if(response.data.user==='valid' && response.data.password==='valid'){
            navigation.navigate('Events',{'username':username.username})
        }else if(response.data.user==='valid' && response.data.password==='invalid'){
                 setError("Invalid Password")
                 return
        }else{
            setError("User not recognized. Please register")
            return
        }
    }

    return(
        <>
        {/* <View style={{flex:0.1,justifyContent:'center',backgroundColor: 'grey' ,alignItems:'flex-end',margin:10}}>
            <Text style={{color:'white',fontSize:20,fontWeight: "bold",margin:20}}>Events App</Text>
        </View> */} 
        
        <View style={{ flex: 0.9,marginLeft: 30,justifyContent:'space-evenly'}}>
            <View style={{alignItems:'flex-start'}}>
              <Text >Username</Text>
              <TextInput style={{height: 40,width: 200, borderColor: 'gray', borderWidth: 1}}
              placeholder="username" onChangeText={(text)=> setUsername({username:text})}/>
            </View>
            <View style={{alignItems:'flex-start'}}>
              <Text>Password</Text>
              <TextInput style={{height: 40, width: 200,borderColor: 'gray', borderWidth: 1}}
              placeholder='password' secureTextEntry={true} onChangeText={(text)=> setPassword({password:text})}/>
            </View>
            <View style={{alignItems:'flex-start'}}>
                           <Button  title="Submit" onPress={handleSubmit}/>
            </View>
            <View style={{flex: 0.2,maginLeft:30,alignItems:'flex-start' ,flexDirection:'row'}}>
               <Text style={{alignItems:'flex-start',marginRight:20}}>New User?</Text>
               <Text style={{color:'blue'}} onPress={()=> navigation.navigate("Register")}>Register</Text>
             </View>
             <View>
                 <Text style={{color:'red', fontWeight:'bold'}}> {error}</Text>
             </View>
       
        </View>
       
            
                
            
       
        </>
    )

}

export default Login

