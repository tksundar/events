/**
 * Created by tksrajan@gmail.com
 */

import React, {Component} from 'react'
import {View, TextInput, Text, Switch, Button, ScrollView,TouchableOpacity} from "react-native";
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
        this.setState({loading:false})

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
   getElement = ()=>{
        if(this.state.loading){
            return (
                <>
                    <TopBanner/>
                    <Spinner />
                </>
            )
        }else{
            return (
                  <>


                <View style={styles.topBanner}>
                    <View style={{alignItems:'flex-start',width:'10%'}}><HeaderNavigationBar {...this.props.navigation}/></View>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={{color:'white',fontSize:20,marginLeft:'70%'}}>Events</Text>
                             </View>
                </View>
                <View style={{justifyContent:'flex-start',flexDirection:'row'}}>
                    <View >
                        <Text style={{marginLeft:'40%',fontSize: 15, fontWeight:'bold', alignItems:'center'}}>Change Password</Text>
                    </View>
                    <View style={{marginLeft:'10%'}}>
                     <Switch
                            trackColor={{false: "#767577", true: "#81b0ff"}}
                            thumbColor={this.state.showPassword ? "#f5dd4b" : "#f4f3f4"}
                            value={!this.state.showPassword}
                            onValueChange={() => this.setState({showPassword: !this.state.showPassword})}/>
                            <Text style={{fontSize: 10, marginTop: 5, color: 'black'}}>show password</Text>
                        </View>


                </View>
                <SafeAreaView style={{justifyContent:'space-around'}}>
                <ScrollView>
                <View style={{
                    flex: 1,
                    justifyContent: 'space-evenly', alignItems: 'center',
                }}>
                     <View style={{alignItems: 'flex-start', margin: 5}}>
                        <TextInput style={styles.item} placeholder="Email Address"
                                   onChangeText={(text) => this.setState({email: text})}/>
                    </View>
                    <View style={{alignItems: 'flex-start'}}>
                        <TextInput style={styles.item}
                                   placeholder='Old password' secureTextEntry={this.state.showPassword}
                                   onChangeText={(text) => this.setState({oldPassword: text})}/>

                    </View>
                    <View style={{alignItems: 'flex-start'}}>
                        <TextInput style={styles.item}
                                   placeholder='New password' secureTextEntry={this.state.showPassword}
                                   onChangeText={(text) => this.setState({newPassword: text})}/>

                    </View>
                    <View style={{alignItems: 'flex-start'}}>
                        <TextInput style={styles.item}
                                   placeholder='confirm new password' secureTextEntry={this.state.showPassword}
                                   onChangeText={(text) => this.setState({confirmPassword: text})}/>

                    </View>
                    <View style={{alignItems: 'flex-start'}}>
                        <TouchableOpacity style={styles.appButtonContainer} onPress={this.handleSubmit}>
                            <Text style={styles.appButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{color: 'red', fontWeight: 'bold'}}> {this.state.error}</Text>
                    </View>

                </View>
                    </ScrollView>
                </SafeAreaView>
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