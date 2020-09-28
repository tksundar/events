import React, {useState} from 'react'
import {Button, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native'
import {getRemoteData} from './Util';
import {URL_EVENT_REGISTRATION} from "./Constants"


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
    const [pickup, setPickup] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        console.log('Event Registration.handleSubmit called with', event.event_name,
            name.name, payment.payment, paymentRef.paymentRef, numGuests.numGuests, numDays.numDays, arrivalDate.arrivalDate,
            arrivalTime.arrivalTime, departureDate.departureDate, modeOfTravel.modeOfTravel, pickup.pickup)
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
        const response = await getRemoteData(URL_EVENT_REGISTRATION, formData)
        console.log(response.staus, '\n', response.data)
        if (response.data.update === 'success') {
            navigation.navigate('SuccessPage')
        } else {
            setError(response.data.update)
        }

    }


    return (
        <>
            <View style={styles.banner}>
                <Text style={{color: 'white', fontSize: 20}}>Registration for {event.event_name}</Text>
                <Text style={{color: 'white', justifyContent: 'flex-end'}}>{username.username}</Text>
            </View>

                <ScrollView style={{
                    backgroundColor: '#d9e3f0',
                    marginHorizontal: 20,
                }}>
                    <Text>{error.error}</Text>

                    <View style={styles.hflex}>
                        <View style={{alignItems: 'flex-start', margin: 5}}>
                            <Text>Event Name</Text>
                            <TextInput style={styles.item}
                                       placeholder={event.event_name}/>
                        </View>
                        <View style={{alignItems: 'flex-start', margin: 5}}>
                            <Text>Name</Text>
                            <TextInput style={styles.item} defaultValue={username.username}
                                       onChangeText={(text) => setName({name: text})}/>
                        </View>
                    </View>
                    <View style={styles.hflex}>
                        <View style={{alignItems: 'flex-start', margin: 5}}>
                            <Text>Payment</Text>
                            <TextInput style={styles.item}
                                       placeholder="Payment Amount"
                                       onChangeText={(text) => setPayment({payment: text})}/>
                        </View>
                        <View style={{alignItems: 'flex-start', margin: 5}}>
                            <Text>Payment Ref</Text>
                            <TextInput style={styles.item} placeholder="Payment Ref"
                                       onChangeText={(text) => setPaymentRef({paymentRef: text})}/>
                        </View>
                    </View>

                    <View style={styles.hflex}>
                        <View style={{alignItems: 'flex-start', margin: 5}}>
                            <Text>Num of guests</Text>
                            <TextInput style={styles.item}
                                       placeholder="1" onChangeText={(text) => setNumGuests({numGuests: text})}/>
                        </View>
                        <View style={{alignItems: 'flex-start', margin: 5}}>
                            <Text>Num of Days</Text>
                            <TextInput style={styles.item}
                                       placeholder="1" onChangeText={(text) => setNumDays({numDays: text})}/>
                        </View>
                    </View>
                    <View style={styles.hflex}>
                        <View style={{alignItems: 'flex-start', margin: 5}}>
                            <Text>Arrival Date</Text>
                            <TextInput style={styles.item}
                                       placeholder={event.event_date}
                                       onChangeText={(text) => setArrivalDate({arrivalDate: text})}/>
                        </View>
                        <View style={{alignItems: 'flex-start', margin: 5}}>
                            <Text>Arrival Time</Text>
                            <TextInput style={styles.item}
                                       placeholder={event.event_time}
                                       onChangeText={(text) => setArrivalTime({arrivalTime: text})}/>
                        </View>
                    </View>
                    <View style={styles.hflex}>
                        <View style={{alignItems: 'flex-start', margin: 5}}>
                            <Text>Departure Date</Text>
                            <TextInput style={styles.item}
                                       placeholder='' onChangeText={(text) => setDepartureDate({departureDate: text})}/>
                        </View>
                        <View style={{alignItems: 'flex-start', margin: 5}}>
                            <Text>Mode Of Travel</Text>
                            <TextInput style={styles.item}
                                       placeholder='Mode of Travel'
                                       onChangeText={(text) => setModeOfTravel({modeOfTravel: text})}/>
                        </View>
                    </View>
                    <View style={styles.hflex}>
                        <View style={{alignItems: 'flex-start', margin: 5}}>
                            <Text>Pickup Required</Text>
                            <TextInput style={styles.item}
                                       placeholder='No' onChangeText={(text) => setPickup({pickup: text})}/>

                        </View>
                    </View>
                    <View style={styles.hflex}>
                        <View style={{alignItems: 'flex-start'}}>
                            <Button title="Submit" onPress={handleSubmit}/>
                        </View>
                    </View>
                </ScrollView>



        </>

    )

}

const styles = StyleSheet.create({
    hflex: {
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        alignItems: "flex-start",
        justifyContent: "space-evenly"
    },

    vFlex: {
        flexDirection: 'column',

        justifyContent: 'space-evenly'
    },

    banner: {
        justifyContent: 'center',
        backgroundColor: '#2196F3',
        alignItems: 'flex-end',
        margin: 10,
    },
    item: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1
    },
})

export default EventRegistration