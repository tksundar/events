import React, {Component, useState} from 'react'
import {TouchableOpacity, ScrollView, StyleSheet, Text, View} from 'react-native'
import {Button, Colors, RadioButton, TextInput} from "react-native-paper";
import {getRemoteData, getDate} from './Util';
import {URL_CHECK_USER, URL_EVENT_REGISTRATION} from "./Constants"
import {SafeAreaView} from "react-native-safe-area-context";
import styles from "../styles/Styles";
import {Picker} from "@react-native-community/picker";
import TopBanner from "./TopBanner";
import Spinner from "./Spinner";

import {DateTimeComponent, ModeOfTravel, Pickup,  PICKUP} from "./Components";
import Icon from "react-native-vector-icons";


class EventRegistration extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        const event = this.props.route.params.event
        this.state = {
            eventName: event.event_name,
            name: this.props.route.params.username,
            payment: '',
            paymentRef: '',
            numGuests: '1',
            numDays: '2',
            arrivalDate: event.event_date,
            arrivalTime: event.event_time,
            departureDate: '',
            modeOfTravel: 'Air',
            pickup: 'Yes',
            loading: false,
            error: ''
        }

    }

    handleSubmit = async () => {

        const formData = new FormData();
        // let event = this.props.route.params.event
        // let username = this.props.route.params.username
        // let _name = this.state.name === undefined ? username : this.state.name
        // let _ng = this.state.numGuests === undefined ? "1" : this.state.numGuests
        // let _nd = this.state.numDays === undefined ? 2 : this.state.numDays
        // let _ad = this.state.arrivalDate === undefined ? event.event_date : this.state.arrivalDate
        // let _at = this.state.arrivalTime === undefined ? event.event_time : this.state.arrivalTime
        // let _mt = this.state.modeOfTravel === undefined ? 'Air' : this.state.modeOfTravel
        // let _pickup = this.state.pickup === undefined ? 'Yes' : this.state.pickup

        console.log('Submitting form with ',
            this.state.name,
            this.state.eventName,
            this.state.payment,
            this.state.paymentRef,
            this.state.numGuests,
            this.state.numDays,
            this.state.arrivalDate,
            this.state.arrivalTime,
            this.state.departureDate,
            this.state.modeOfTravel,
            this.state.pickup)
           let err = this.valid()
        console.log('err=>',err)
           if(err !== undefined){
               this.setState({error:err})
               return
           }
        console.log("data valid. submitting...")
        formData.append('name', this.state.name)
        formData.append('event_name', this.state.eventName)
        formData.append('payment_amount', this.state.payment)
        formData.append('payment_ref', this.state.paymentRef)
        formData.append('num_guests', this.state.numGuests)
        formData.append('num_days', this.state.numDays)
        formData.append('arrival_date', getDate(this.state.arrivalDate,"date"))
        formData.append('arrival_time', getDate(this.state.arrivalTime,'time'))
        formData.append('departure_date', getDate(this.state.departureDate,'date'))
        formData.append('mode_of_travel', this.state.modeOfTravel)
        formData.append('pickup', this.state.pickup)
        this.setState({loading: true})
        const response = await getRemoteData(URL_EVENT_REGISTRATION, formData)
        this.setState({loading: false})
        console.log(response.staus, '\n', response.data)
        if (response.status === 200) {
            if (response.data.update === 'success') {
                let formData = new FormData();
                formData.append('name', this.state.name);
                formData.append('event_name', this.state.eventName);
                this.setState({loading: true})
                const response = await getRemoteData(URL_CHECK_USER, formData);
                this.setState({loading: false})
                this.props.navigation.navigate('RegistrationDetails', response.data)
            } else {
                this.setState({error: response.data.update})
            }
        } else {
            this.setState({error: 'Server error. Server returned status code ' + response.status})
        }

    }

   valid = ()=>{
        if(isNaN(this.state.payment)){
            let msg = 'payment must be a number'
            alert(msg)
            return msg
        }
        if(this.state.arrivalDate > this.state.departureDate){
            let msg = 'Arrival Date can not be later than departure date'
            alert(msg)
            return msg
        }

        return undefined
   }
    setModeOfTravel = (modeOfTravel) => {
        console.log('Mode Of Travel =>', modeOfTravel)
        this.setState({modeOfTravel: modeOfTravel})
    }

    setPickup = (pickup) => {
        console.log('pickup =>', pickup)
        this.setState({pickup: pickup})
    }

    setArrivalDate = (date) => {
        console.log('date = > ', date)
        this.setState({arrivalDate: date})
    }
    setDepartureDate = (date) => {

        this.setState({departureDate: date})
    }
    setArrivalTime = (date) => {
        this.setState({arrivalTime: date})
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
                    <View style={{backgroundColor: '#000', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text
                            style={{height: 20, color: 'white', fontSize: 15, marginRight: 15}}>{this.state.name}</Text>
                    </View>

                    <View style={{flex: 0.6, alignItems: 'center', justifyContent: 'space-evenly'}}>
                        <ScrollView>
                            <SafeAreaView>
                                <Text>{this.state.error}</Text>
                                <TextInput style={styles.item1}
                                           label={this.state.eventName}
                                           disabled={'true'}/>
                                <TextInput style={styles.item1} value={this.state.name} label={"Username"}
                                           onChangeText={(text) => this.setState({name: text})}/>


                                <TextInput style={styles.item1}
                                           label="Payment Amount"
                                           onChangeText={(text) => this.setState({payment: text})
                                           }/>


                                <TextInput style={styles.item1} label="Payment Ref"
                                           onChangeText={(text) => this.setState({paymentRef: text})}/>


                                <TextInput style={styles.item1}
                                           label="Num Guests" value={this.state.numGuests}
                                           onChangeText={(text) => this.setState({numGuests: text})}/>


                                <TextInput style={styles.item1} label={"Num Days"}
                                           value={this.state.numDays}
                                           onChangeText={(text) => this.setState({numDays: text})}/>

                                <DateTimeComponent set={this.setArrivalDate} title={'Arrival Date'}
                                                   mode={'date'}/>

                                <DateTimeComponent set={this.setArrivalTime} title={'Arrival Time'} mode={'time'}
                                                   locale={'IN'}/>

                                <DateTimeComponent set={this.setDepartureDate} title={'Departure Date'}
                                                   mode={'date'}/>

                                <ModeOfTravel set={this.setModeOfTravel}/>
                                {/*<MOT set={this.setModeOfTravel}*/}
                                {/*selectedItem={"Air"}/>*/}
                                <Pickup set={this.setPickup}/>
                                {/*<PICKUP set={this.setPickup} />*/}

                                <View style={{alignItems: 'center', marginTop: 20}}>
                                    <Button mode='outlined' onPress={this.handleSubmit}>
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

    render() {
        return (
            this.getElement()
        )
    }


}


export default EventRegistration
