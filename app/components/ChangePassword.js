/**
 * Created by tksrajan@gmail.com
 */

import React, {Component} from 'react'
import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import {TextInput,Button} from "react-native-paper";
import PasswordInput from "./PasswordInput";
import {URL_CHANGE_PASSWORD} from './Constants'
import {getRemoteData} from "./Util";
import HeaderNavigationBar from "./HeaderNavigationBar";
import styles from "../styles/Styles";
import {SafeAreaView} from "react-native-safe-area-context";
import Spinner from "./Spinner";
import TopBanner from "./TopBanner";


class ChangePassword extends Component {


    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            email: '',
            showPassword: true,
            error: '',
            loading: false

        }

    }

    handleSubmit = async () => {
        let formData = new FormData()
        if (this.state.newPassword !== this.state.confirmPassword) {
            this.setState({error: 'New password and Confirm new password do not match'})
            return
        }
        formData.append('temp_password', this.state.oldPassword)
        formData.append('password', this.state.newPassword)
        formData.append('email', this.state.email)
        this.setState({loading: true})
        const response = await getRemoteData(URL_CHANGE_PASSWORD, formData)
        this.setState({loading: false})

        if (response.status === 200) {
            console.log(response.data)
            if (response.data.status === 'success') {
                console.log("password change successful")
                this.props.navigation.navigate("SuccessPage", {"message": "Password Changed"})
            } else {
                this.setState({
                    error: response.data.status,
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                    email: '',
                    showPassword: true,

                })

            }
        } else {
            this.setState({
                error: response.data,
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                email: '',
                showPassword: true,
            })
        }
    }
    getElement = () => {
        if (this.state.loading) {
            return (
                <>
                    <TopBanner/>
                    <Spinner/>
                </>
            )
        } else {
            return (
                <>


                    <View style={styles.topBanner}>
                        <View style={{
                            alignItems: 'flex-start',
                            width: '10%'
                        }}><HeaderNavigationBar {...this.props.navigation}/></View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={{color: 'white', fontSize: 20, marginLeft: '70%'}}>Events</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{marginTop: 20, fontWeight: 'bold',fontSize:20, textAlign: 'center'}}>Change
                            Password</Text>
                    </View>


                    <ScrollView>
                        <SafeAreaView style={{justifyContent: 'space-around', marginTop: 20}}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'space-evenly', alignItems: 'center',
                            }}>
                                <TextInput style={styles.item1} label="Email Address"
                                           onChangeText={(text) => this.setState({email: text})}/>


                                <PasswordInput style={styles.item1}
                                               label='Old password'
                                               onChangeText={(text) => this.setState({oldPassword: text})}/>


                                <PasswordInput style={styles.item1}
                                               label='New password'
                                               onChangeText={(text) => this.setState({newPassword: text})}/>


                                <PasswordInput style={styles.item1}
                                               label='Confirm new password'
                                               onChangeText={(text) => this.setState({confirmPassword: text})}/>


                                <View style={{alignItems: 'flex-start'}}>
                                    <Button mode={'outlined'} onPress={this.handleSubmit}>
                                       Submit
                                    </Button>
                                </View>
                                <View>
                                    <Text style={{color: 'red', fontWeight: 'bold'}}> {this.state.error}</Text>
                                </View>

                            </View>
                        </SafeAreaView>
                    </ScrollView>

                </>

            );
        }
    }

    render() {
        return (
            this.getElement()
        );

    }

}


export default ChangePassword