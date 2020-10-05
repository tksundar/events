import React, {useState} from 'react'
import {Button, ScrollView,  StyleSheet, TextInput,Switch, Text, View, TouchableOpacity} from 'react-native'
import {getRemoteData} from './Util'
import {URL_NEW_USER} from "./Constants"
import {SafeAreaView} from "react-native-safe-area-context";
import styles from "../styles/Styles";

const NewUser = ({navigation}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(true)

    const handleSubmit = async () => {
        console.log('HandleSubmit called with values ', username.username, email.email,
            password.password, confirmPassword.confirmPassword, mobile.mobile)
        if (username.username.length === 0 ||
            password.password.length === 0 ||
            mobile.mobile.length === 0 ||
            email.email.length === 0) {
            setErrorMessage('All fields are required')
            return
        }
        if (password.password !== confirmPassword.confirmPassword) {
            let errorMessage = 'Password and Confirm Password do not match'
            console.log(errorMessage)
            setErrorMessage(errorMessage)
            return
        }
        if (!(email.email.includes('@') && email.email.includes('.'))) {
            let errorMessage = 'Please enter a valid email address!'
            console.log(errorMessage)
            setErrorMessage(errorMessage)
            return
        }

        const formData = new FormData();
        formData.append('username', username.username)
        formData.append('password', password.password)
        formData.append('email', email.email)
        formData.append('mobile', mobile.mobile)
        const response = await getRemoteData(URL_NEW_USER, formData)
        console.log(response.status, response.data)
        if (response.status === 200) {
            if (response.data.name === username.username) {
                navigation.navigate('Events')
            } else if (response.data.status === 'existing') {
                setErrorMessage('User exists. Please login. If you forgot your password,' +
                    'use the Forgot Password option to reset your password')
            } else {
                setErrorMessage('If you are seeing this, this is an application bug. Contact administrator')
            }
        } else {
            setErrorMessage("Server responded with error. Please contact administrator")
        }


    }


    return (
        <>
            <ScrollView>
                <SafeAreaView style={{
                    flex: 1,
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>

                    <View style={{alignItems: 'flex-start', margin: 5}}>
                        <Text>Username</Text>
                        <TextInput style={styles.item}
                                   placeholder="username" onChangeText={(text) => setUsername({username: text})}/>
                    </View>
                    <View style={{alignItems: 'flex-start', margin: 5}}>
                        <TextInput style={styles.item}   placeholder="Email Address"
                                   onChangeText={(text) => setEmail({email: text})}/>
                    </View>


                    <View style={{alignItems: 'flex-start', margin: 5}}>

                        <TextInput style={styles.item} placeholder="Mobile"
                                   onChangeText={(text) => setMobile({mobile: text})}/>
                    </View>


                    <View style={{alignItems: 'flex-start', margin: 5}}>

                        <TextInput style={styles.item}
                                   placeholder='password' secureTextEntry={showPassword}
                                   onChangeText={(text) => setPassword({password: text})}/>

                    </View>
                    <View style={{alignItems: 'flex-start', margin: 5}}>

                        <TextInput style={styles.item}
                                   placeholder='confirm password' secureTextEntry={showPassword}
                                   onChangeText={(text) => setConfirmPassword({confirmPassword: text})}/>
                        <View style={{flexDirection: 'row'}}>
                            <Switch
                                trackColor={{false: "#767577", true: "#81b0ff"}}
                                thumbColor={showPassword ? "#f5dd4b" : "#f4f3f4"}
                                value={!showPassword} onValueChange={() => setShowPassword(!showPassword)}/>
                            <Text style={{fontSize: 10, marginTop: 5}}>show password</Text>
                        </View>
                    </View>


                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={styles.appButtonContainer} onPress={handleSubmit}>
                            <Text style={styles.appButtonText}>Register</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.hflex}>
                        <View>
                            <Text style={{color: 'red', fontWeight: 'bold'}}>{errorMessage}</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>

        </>
    )
}
export default NewUser