/**
 * Created by tksrajan@gmail.com on
 */

import React , {useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,Linking} from 'react-native'
import styles from "../styles/Styles";
import {URL_ADMIN,URL_EVENTS_META} from "./Constants";
import HeaderNavigationBar from "./HeaderNavigationBar";
import {getRemoteData} from "./Util";

const AdminViews = (props)=>{
     const {navigation} = props
    const {eventsMeta,setEventsMeta} = useState([])

     const fetchEventsMeta = async () => {
        const response = await getRemoteData(URL_EVENTS_META)
        if (response.status === 200) {
            console.log(response.data);
            setEvents(response.data);
            setLoading(false);
        } else {
            console.log('Error retrieving events data');
        }
    }

     useEffect(() => {
        fetchEventsMeta(eventsMeta)
    }, [])


    console.log('AdminViews : ',navigation)
    return(
        <>
            <View style={styles.topBanner}>
                <View
                    style={{alignItems: 'flex-start', width: '10%'}}><HeaderNavigationBar {...props.navigation}/></View>
                <View style={{alignItems: 'flex-end'}}>
                    <Text style={{color: 'white', fontSize: 20, marginLeft: '70%'}}>Events</Text>
                </View>
            </View>
             <View style={{width: '70%', alignItems: 'flex-start',  marginTop: 30}}>
               <Text> View Registrations for :</Text>
                 <Text></Text>
            </View>
            <View style={{width: '70%', alignItems: 'flex-start',  }}>
                <TouchableOpacity style={styles.appButtonContainer1} onPress={() => Linking.openURL(URL_ADMIN)}>
                    <Text style={{fontSize: 20, color: 'blue'}}> Create Events/Programs </Text>
                </TouchableOpacity>
            </View>
        </>

    )
}
export default AdminViews

