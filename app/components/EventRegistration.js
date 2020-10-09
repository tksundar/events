import React, {useState} from 'react'
import {TouchableOpacity, ScrollView, StyleSheet, Text, View} from 'react-native'
import {Button, TextInput} from "react-native-paper";
import {getRemoteData} from './Util';
import {URL_CHECK_USER, URL_EVENT_REGISTRATION} from "./Constants"
import {SafeAreaView} from "react-native-safe-area-context";
import styles from "../styles/Styles";
import {Picker} from "@react-native-community/picker";
import TopBanner from "./TopBanner";
import Spinner from "./Spinner";


const EventRegistration = ({route, navigation}) => {

    const {event, username} = route.params
    const [name, setName] = useState(username.username)
    const [payment, setPayment] = useState('')
    const [paymentRef, setPaymentRef] = useState('')
    const [numGuests, setNumGuests] = useState('1')
    const [numDays, setNumDays] = useState('')
    const [arrivalDate, setArrivalDate] = useState('')
    const [arrivalTime, setArrivalTime] = useState('')
    const [departureDate, setDepartureDate] = useState('')
    const [modeOfTravel, setModeOfTravel] = useState('')
    const [pickup, setPickup] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    const handleSubmit = async () => {
        const formData = new FormData();

        let _name = name.name === undefined ? username.username : name.name
        let _ng = numGuests.numGuests === undefined ? "1" : numGuests.numGuests
        let _nd = numDays.numDays === undefined ? 2 : numDays.numDays
        let _ad = arrivalDate.arrivalTime === undefined ? event.event_date : arrivalDate.setArrivalDate
        let _at = arrivalTime.arrivalTime === undefined ? event.event_time : arrivalTime.arrivalTime
        let _mt = modeOfTravel.modeOfTravel === undefined ? 'Air' : modeOfTravel.modeOfTravel
        let _pickup = pickup.pickup === undefined ? 'No' : pickup.pickup

        console.log('Submitting form with ', _name, event.event_name, payment.payment, paymentRef.paymentRef,
            _ng, _nd, _ad, _at, departureDate.departureDate, _mt, _pickup)

        formData.append('name', _name)
        formData.append('event_name', event.event_name)
        formData.append('payment_amount', payment.payment)
        formData.append('payment_ref', paymentRef.paymentRef)
        formData.append('num_guests', _ng)
        formData.append('num_days', _nd)
        formData.append('arrival_date', _ad)
        formData.append('arrival_time', _at)
        formData.append('departure_date', departureDate.departureDate)
        formData.append('mode_of_travel', _mt)
        formData.append('pickup', _pickup)
        setLoading(true)
        const response = await getRemoteData(URL_EVENT_REGISTRATION, formData)
        setLoading(false)
        console.log(response.staus, '\n', response.data)
        if (response.data.update === 'success') {
            let formData = new FormData();
            formData.append('name', name.name);
            formData.append('event_name', event.event_name);
            setLoading(true)
            const response = await getRemoteData(URL_CHECK_USER, formData);
            setLoading(false)
            navigation.navigate('RegistrationDetails', response.data)
        } else {
            setError(response.data.update)
        }

    }
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
                    <View style={{backgroundColor: '#000', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style={{height: 20, color: 'white', fontSize: 15, marginRight: 15}}>{username}</Text>
                    </View>

                    <View style={{flex: 0.6, alignItems: 'center'}}>
                        <ScrollView>
                            <SafeAreaView>
                                <Text>{error.error}</Text>
                                <TextInput style={styles.item1}
                                           label={event.event_name}
                                           disabled={'true'}/>
                                <TextInput style={styles.item1} value={username.username} label={"Username"}
                                           onChangeText={(text) => setName({name: text})}/>


                                <TextInput style={styles.item1}
                                           label="Payment Amount"
                                           onChangeText={(text) => setPayment({payment: text})}/>


                                <TextInput style={styles.item1} label="Payment Ref"
                                           onChangeText={(text) => setPaymentRef({paymentRef: text})}/>


                                <TextInput style={styles.item1}
                                           label="Num Guests" value={"1"}
                                           onChangeText={(text) => setNumGuests({numGuests: text})}/>


                                <TextInput style={styles.item1} label={"Num Days"}
                                           value="1" onChangeText={(text) => setNumDays({numDays: text})}/>


                                <TextInput style={styles.item1} label={"Arrival Date"}
                                           value={event.event_date}
                                           onChangeText={(text) => setArrivalDate({arrivalDate: text})}/>


                                <TextInput style={styles.item1} label={"Arrival Time"}
                                           value={event.event_time.substring(0, 5)}
                                           onChangeText={(text) => setArrivalTime({arrivalTime: text})}/>


                                <TextInput style={styles.item1}
                                           label='Departure Date'
                                           onChangeText={(text) => setDepartureDate({departureDate: text})}/>


                                <TextInput style={styles.item1}
                                           label='Mode of Travel'
                                           placeholder={"Air|Train|Road"}
                                           onChangeText={(text) => setModeOfTravel({modeOfTravel: text})}/>

                                <TextInput style={styles.item1} label={"Pickup Required"}
                                           placeholder={"Yes|No"}
                                           onChangeText={(text) => setPickup({pickup: text})}/>

                                <View style={{alignItems: 'center', marginTop: 20}}>
                                    <Button mode='outlined' onPress={handleSubmit}>
                                        Register
                                    </Button>

                                </View>
                            </SafeAreaView>
                        </ScrollView>
                    </View>

                </>

            )
        }
    }

    return (
        getElement()
    )

}


export default EventRegistration