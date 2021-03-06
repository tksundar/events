import React, {useState} from 'react'
import {ScrollView,SafeAreaView,  StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {Button, TextInput} from "react-native-paper";
import {getRemoteData} from './Util'
import {URL_NEW_USER} from "./Constants"
import styles from "../styles/Styles";
import PasswordInput from "./PasswordInput";
import HeaderNavigationBar from "./HeaderNavigationBar";

const NewUser = (props) => {

    const{navigation} = props
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
                navigation.navigate('Events',{"username":username.username})
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
             <View style={styles.topBanner}>
                        <View style={{
                            alignItems: 'flex-start',
                            width: '10%'
                        }}><HeaderNavigationBar {...props.navigation}/></View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={{color: 'white', fontSize: 20, marginLeft: '70%'}}>Events</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{marginTop: 20, fontWeight: 'bold',fontSize:20, textAlign: 'center'}}>Register
                            </Text>
                    </View>
            <ScrollView>
                <SafeAreaView style={{
                    flex: 1,
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>

                    <View style={{alignItems: 'center'}}>
                        <TextInput style={[styles.item1,{marginTop:20}]}
                                   label="Username" onChangeText={(text) => setUsername({username: text})}/>
                        <TextInput style={styles.item1}   label="Email Address"
                                   onChangeText={(text) => setEmail({email: text})}/>
                        <TextInput style={styles.item1} label="Mobile"
                                   onChangeText={(text) => setMobile({mobile: text})}/>
                        <PasswordInput style={styles.item1}
                                   label='Password'
                                   onChangeText={(text) => setPassword({password: text})}/>

                        <PasswordInput style={styles.item1}
                                   label='Confirm password'
                                   onChangeText={(text) => setConfirmPassword({confirmPassword: text})}/>
                    </View>


                    <View style={{alignItems: 'center'}}>
                       <Button mode={'outlined'} onPress={handleSubmit}>Register</Button>
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
