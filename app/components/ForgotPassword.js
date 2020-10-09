import React , {useState} from 'react'
import {View,  Text} from "react-native";
import {TextInput,Button} from "react-native-paper";
import {URL_FORGOT_PASSWORD} from "./Constants";
import {getRemoteData} from "./Util";
import styles from "../styles/Styles";
import HeaderNavigationBar from "./HeaderNavigationBar";
import Spinner from "./Spinner";
import TopBanner from "./TopBanner";

const ForgotPassword = (props) =>{

    const [email,setEmail] = useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
   const {navigation} = props
    const handleSubmit = async () =>{
        let formData = new FormData()
        formData.append('email', email.email)
        setLoading(true)
        const response = await getRemoteData(URL_FORGOT_PASSWORD, formData)
        setLoading(false)
        if (response.status === 200 ) {
            if (response.data.status === 'success') {
                console.log('forgot password :',response.data.status)
                navigation.navigate("SuccessPage", {"message": "A temporary password has been mailed to you. " +
                        "Please use that to  change password from the change password menu"})
                setError('')
                setEmail('')
            } else {
                setError(response.data.status)
                setEmail('')
            }
        } else {
            setError(response.data)
        }
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
            return(
                 <>
           <View style={styles.topBanner}>
                    <View style={{alignItems:'flex-start',width:'10%'}}><HeaderNavigationBar {...props.navigation}/></View>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={{color:'white',fontSize:20,marginLeft:'70%'}}>Events</Text>
                             </View>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View >
                        <Text style={{marginTop:20, fontSize:20,fontWeight:'bold', textAlign:'center'}}>Forgot Password</Text>
                    </View>

                </View>
            <View style={{justifyContent:'center',alignItems: 'center',marginTop:20}}>
                <TextInput style={styles.item1} label="Email Address"
                           onChangeText={(text) => setEmail({email: text})}/>
            </View>
            <View style={{justifyContent:'center',alignItems: 'center',marginTop:20}}>
                <Button mode={'outlined'} onPress={handleSubmit}>
                   Submit
                </Button>
            </View>
            <View style={{marginTop: 20}}><Text style={{color:'red'}}>{error}</Text></View>
        </>
            )
        }
    }

    return(
            getElement()
    )
}

export default ForgotPassword