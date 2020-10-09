/**
 * Created by tksrajan@gmail.com on
 */

import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Linking} from 'react-native'
import {Button, RadioButton} from 'react-native-paper'
import styles from "../styles/Styles";
import {URL_ADMIN, URL_EVENTS} from "./Constants";
import HeaderNavigationBar from "./HeaderNavigationBar";
import {getRemoteData} from "./Util";
import TopBanner from "./TopBanner";
import Spinner from "./Spinner";

const AdminViews = (props) => {
    const {navigation} = props
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState('')

    const fetchEvents = async () => {

        const response = await getRemoteData(URL_EVENTS)
        if (response.status === 200) {
            console.log(response.data);
            setEvents(response.data);
            setLoading(false);
        } else {
            console.log('Error retrieving events data');
        }
    }

    useEffect(() => {
        fetchEvents(events)
    }, [])


    const RadioButtons = events.map((item, index) => {
        let event_name = item.event_name
        console.log(event_name)
        return (
            <View key={index} style={{marginLeft: 30}}>
                <RadioButton.Item label={event_name} value={event_name}/>
            </View>
        )
    })

    const getElement = () => {
        if (loading) {
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
                        <View
                            style={{
                                alignItems: 'flex-start',
                                width: '10%'
                            }}><HeaderNavigationBar {...props.navigation}/></View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={{color: 'white', fontSize: 20, marginLeft: '70%'}}>Events</Text>
                        </View>
                    </View>
                    <View style={{marginTop:'10%',justifyContent:'center',alignItems:'center'}}>
                    <View style={{margin: 20, borderColor: 'blue', borderWidth: 1, width: '80%', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, textAlign: 'left'}}>View Registrations</Text>

                        <View style={{width: '70%', alignItems: 'flex-start', marginTop: 30}}>
                            <View>
                                <RadioButton.Group onValueChange={value => {
                                    console.log('selected value', value)
                                    setValue(value)
                                }} value={value}>
                                    {RadioButtons}
                                </RadioButton.Group>
                            </View>
                            <Button style={{marginLeft: 50,marginBottom:10}} mode={'outlined'}
                                    onPress={() => {
                                        console.log(value)
                                        navigation.navigate("ViewRegistrations", {'event_name': value})
                                    }

                                    }>submit</Button>

                        </View>
                    </View>
                    <View style={{margin: 20, borderColor: 'blue', borderWidth: 1, width: '80%', alignItems: 'center'}}>
                        <Text style={{marginTop:20,marginBottom:20,fontSize: 20, textAlign: 'left'}}>Create event or event item</Text>
                        <Button mode='outlined' onPress={() => Linking.openURL((URL_ADMIN))}>Admin Console</Button>
                    </View>
                        </View>
                </>
            )

        }
    }
    console.log('AdminViews : ', navigation)
    return (
        getElement()

    )
}
export default AdminViews

