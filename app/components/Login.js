import React, {useState} from 'react'
import {Button, Switch, Text, TextInput, View,TouchableOpacity} from 'react-native'
import {getRemoteData} from './Util'
import {URL_LOGIN} from './Constants'
import Spinner from "./Spinner";


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
                <View style={{backgroundColor: '#2196F3', flexDirection: 'row', justifyContent: 'flex-end',}}>
                    <Text style={{color: 'white', alignItems: 'flex-end', fontSize: 20, margin: 10}}>Events App</Text>
                </View>
                <View style={{flex: 1,
                    justifyContent: 'space-evenly', alignItems: 'center' , }}>
                    <View style={{alignItems: 'flex-start'}}>
                        <Text style={{color:'white'}}>Username</Text>
                        <TextInput style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1,color:'white'}}
                                   placeholder="username" onChangeText={(text) => setUsername({username: text})}/>
                    </View>
                    <View style={{alignItems: 'flex-start'}}>
                        <Text style={{color:'white'}}>Password</Text>
                        <TextInput style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, color:'white'}}
                                   placeholder='password' secureTextEntry={showPassword}
                                   onChangeText={(text) => setPassword({password: text})}/>
                        <View style={{flexDirection: 'row'}}>
                            <Switch
                                trackColor={{false: "#767577", true: "#81b0ff"}}
                                thumbColor={showPassword ? "#f5dd4b" : "#f4f3f4"}
                                value={!showPassword} onValueChange={() => setShowPassword(!showPassword)}/>
                            <Text style={{fontSize: 10, marginTop: 5,color:'white'}}>show password</Text>
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-start'}}>
                        <Button title="Submit" onPress={handleSubmit}/>
                    </View>
                    <View style={{flex: 0.2, maginLeft: 30, alignItems: 'flex-start', flexDirection: 'row'}}>
                        <Text style={{alignItems: 'flex-start', marginRight: 20,color:'white'}}>New User?</Text>
                        <TouchableOpacity>
                            <Text style={{color: 'green'}} onPress={() => navigation.navigate("Register")}>Register</Text>
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
                    <View style={{backgroundColor: '#2196F3', flexDirection: 'row', justifyContent: 'flex-end',}}>
                        <Text style={{color: 'white', alignItems: 'flex-end', fontSize: 20, margin: 10}}>Events
                            App</Text>
                    </View>
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

