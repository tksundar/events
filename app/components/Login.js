import React, {useState} from 'react'
import {Button, Switch, Text, TouchableOpacity, View} from 'react-native'
import {TextInput} from "react-native-paper";
import {getRemoteData} from './Util'
import {URL_LOGIN} from './Constants'
import Spinner from "./Spinner";
import HeaderNavigationBar from "./HeaderNavigationBar";
import styles from "../styles/Styles";
import PasswordInput from "./PasswordInput";


const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(true)
    const {navigation} = props

    const handleSubmit = async () => {

        console.log('HandleSubmit called with values ', username.username, password.password)
        const formData = new FormData();
        formData.append('username', username.username)
        formData.append('password', password.password)
        setLoading(true)
        const response = await getRemoteData(URL_LOGIN, formData)
        setLoading(false)

        if (response.data !== undefined) {
            if (response.data.user === 'valid' && response.data.password === 'valid') {
                navigation.navigate('Events', {'username': username.username})
            } else if (response.data.user === 'valid' && response.data.password === 'invalid') {
                setError("Invalid Password")

            } else if (response.data.user === 'invalid') {
                setError('User not recognized.Please register')
            }
        } else {
            console.log("Unknown ====> ", response)
            setError('Possible network issue. Please try later')

        }
    }

    const getLoginForm = () => {
        return (
            <>
                <View style={{
                    flex: 1,
                    justifyContent: 'space-evenly', alignItems: 'center',
                }}>
                    <Text style={{margin:10,fontWeight:'bold', fontSize:20}}>Login</Text>
                     <View style={{marginTop:40 , alignItems:'center'}}>
                         <TextInput style={styles.item1} label='Username' onChangeText={(text)=>
                         setUsername({username:text})}/>
                         <PasswordInput style={styles.item1} lable="password" onChangeText = {(text)=>
                             setPassword({password:text})}/>
                     </View>

                    <View style={{alignItems: 'flex-start'}}>
                        <TouchableOpacity style={styles.appButtonContainer} onPress={handleSubmit}>
                            <Text style={styles.appButtonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 0.2, maginLeft: 30, alignItems: 'flex-start', flexDirection: 'row'}}>
                        <Text style={{alignItems: 'flex-start', marginRight: 20, color: 'black'}}>New User?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={{color: 'blue'}}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{color: 'red', fontWeight: 'bold'}}> {error}</Text>
                    </View>

                </View>
            </>
        )
    }

    const getElement = () => {
        if (loading) {
            return (
                <>
                    {/*<View style={{backgroundColor: '#2196F3', flexDirection: 'row', justifyContent: 'flex-end',}}>*/}
                    {/*    <Text style={{color: 'white', alignItems: 'flex-end', fontSize: 20, margin: 10}}>Events*/}
                    {/*        App</Text>*/}
                    {/*</View>*/}
                    <Spinner/>
                </>
            )
        } else {
            return (getLoginForm())
        }
    }

    return (
        getElement()
    )

}

export default Login

