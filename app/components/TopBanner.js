import {Text, View} from "react-native";
import React from "react";
import HeaderNavigationBar from "./HeaderNavigationBar";

/**
 * Created by tksrajan@gmail.com
 */


const TopBanner = ({props})=>{

    return(

                <View style={{height:10,backgroundColor: '#2196F3', alignItems:'flex-start',flexDirection: 'row'}}>
                    <Text style={{color: 'white',alignItems: 'flex-end', margin:20}}>
                        Events
                    </Text>
            </View>


    )
}
export default TopBanner