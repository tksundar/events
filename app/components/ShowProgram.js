/**
 * Created by tksrajan@gmail.com on
 */
import React, {useState, useEffect} from 'react'

import {Text, TouchableOpacity, View} from 'react-native'
import styles from "../styles/Styles";
import {getRemoteData} from "./Util";
import {URL_VIEW_PROGRAM} from "./Constants";
import Spinner from "./Spinner";
import TopBanner from "./TopBanner";

const ShowProgram = ({route, navigation}) => {

    const {event, username} = route.params
    const {event_name} = event
    const [programs, setPrograms] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const getPrograms = async () => {
        setLoading(true)
        let data = new FormData()
        data.append('event_name',event_name)
        const response = await getRemoteData(URL_VIEW_PROGRAM, data)
        setLoading(false)
        if (response.status === 200) {
            setPrograms(response.data)
            console.log('ShowProgram:', programs)
        } else {
            if(response.data !==undefined) {
                setError(response.data)
            }else{
                setError('Server Error. Contact Administrator')
            }
        }
    }


    useEffect(() => {
         getPrograms(programs)

    }, [])



 const element = programs.map((p, index) => {
        let thePerson = p.speaker === 'NA' ? p.presenter:p.speaker
        return (
            <><View style={{margin:5}}>

                <View key={index} style={{flexDirection:'row'}}>
                    <Text style={{width:'20%',alignItems:'center'}}>{p.date}:</Text>
                    <Text style={{width:'15%',alignItems:'center'}}>{p.time.substring(0,5)}</Text>
                    <Text style={{width:'40%',alignItems:'center'}}>{p.title}</Text>
                    <Text style={{width:'25%',alignItems:'center'}}>{thePerson}</Text>

                </View>
                 <View style={{width:'100%',height:1,backgroundColor:'grey',marginTop:5}}/>

     </View>

            </>

        )
    });

    const getElement = ()=>{
        if(loading){
            return(
                <>
                    <Spinner/>
                </>
            )
        }else{
            return (
                 <>
                     <View style={{margin:5}}>
                <View style={{flexDirection:'row', backgroundColor:'#0a0a0a' }}>
                        <Text style={{width:'20%',fontWeight:'bold',color:'#fff'}}>Date</Text>
                        <Text style={{width:'15%',fontWeight:'bold',color:'#fff'}}>Time</Text>
                        <Text style={{width:'40%',fontWeight:'bold',color:'#fff'}}>Program</Text>
                        <Text style={{width:'25%',fontWeight:'bold',color:'#fff'}}>Presenter</Text>
                </View>
                     </View>
            {element}
        </>
            )
        }
    }


    return (
       getElement()
    )
}
export default ShowProgram
