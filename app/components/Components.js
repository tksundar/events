/**
 * Created by tksrajan@gmail.com on
 */
import React, {useState} from "react";
import {View, Text, TouchableOpacity, TextInput} from "react-native";
import {Button, RadioButton} from 'react-native-paper'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

import {getDate} from "./Util";


export const ModeOfTravel = (props) => {
     const [value,setValue] = useState('')
    return (
        <View style={{
            borderColor: 'gray', borderWidth: 1, width: 300, marginLeft: 10, marginBottom: 20, marginTop: 10,
            justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
        }}>
            <Text style={{textAlign: 'left', marginRight: 80}}>Mode of Travel</Text>
            {/*<View style={{flexDirection:'row',alignItems:'center'}}>*/}
            <RadioButton.Group value={value} onValueChange={(value) => {
                setValue(value)
               props.set(value)

            }}>
                <View>
                    <Text>Air</Text>
                    <RadioButton value="Air"/>
                </View>
                <View>
                    <Text>Train</Text>
                    <RadioButton value="Train"/>
                </View>
                <View>
                    <Text>Road</Text>
                    <RadioButton value="Road"/>
                </View>
            </RadioButton.Group>
            {/*</View>*/}
        </View>
    );
};

export const Pickup = (props) => {
    const [value,setValue] = useState('')
    return (
        <View style={{
            borderColor: 'gray', borderWidth: 1, width: 300, marginLeft: 10, marginBottom: 20, marginTop: 10,
            justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
        }}>
            <Text style={{textAlign: 'left', marginRight: 100}}>Pickup</Text>
            {/*<View style={{flexDirection:'row',alignItems:'center'}}>*/}
            <RadioButton.Group value={value} onValueChange={(value) => {
                setValue(value)
                props.set(value)
                console.log(value)
            }}>

                <View>
                    <Text>Yes</Text>
                    <RadioButton value="Yes"/>
                </View>
                <View>
                    <Text>No</Text>
                    <RadioButton value="No"/>
                </View>

            </RadioButton.Group>
            {/*</View>*/}
        </View>
    );
};
export const DateTimeComponent = (props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [value, setValue] = useState('')
    let title = props.title


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);

    };

    const handleConfirm = (date) => {
        props.set(date)
        setValue(getDate(date,props.mode))
        hideDatePicker();
    };

    return (
        <View style={{
            marginLeft: 10, marginBottom: 20,
            borderWidth: 1, borderColor: 'gray', width: 300, height: 60, justifyContent: 'center'
        }}>

            <Button mode={'outlined'} onPress={showDatePicker}>{title}</Button>
            <Text style={{fontStyle: 'italic', textAlign: 'right'}}>{value}</Text>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={props.mode}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

export class PICKUP extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: ''

        }

    }

    render() {
        return (

                <View style={{borderColor:'gray',borderWidth:1,justifyContent:'center' , width:300,marginLeft:10}}>
                    <Text>Pickup</Text>
                    <DropDownPicker
                items={[

        {label: 'Yes', value: 'Yes'},
        {label: 'No', value: 'No' },
    ]
}
                defaultValue={"Yes"}
                containerStyle={{height: 40}}
                style={{alignItems:'flex-start',backgroundColor: '#fafafa', width:300}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => {
                    this.setState({selectedItem: item.value})
                    this.props.set(this.state.selectedItem)
                }}
            />
            </View>

        )
    }
}

