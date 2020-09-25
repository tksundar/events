import React, { useState} from 'react';
import { Text, View,Button,StyleSheet } from 'react-native';

const Styles= StyleSheet.create({

    center: {
        alignItems : "center"
    }
});

const Greetings = (props) =>{

    return(
        <View style={Styles.center}>
            <Text>Hello, {props.name}</Text> 
        </View>
    );
}

const LotsOfGreetings = ()=>{
    return(
        <View style={[Styles.center,{top: 50}]}>
          
          <Greetings name="Rexaar"/>
          <Greetings name="Babu"/>
          <Greetings name="piku"/>

        </View>
    )
}

const ButtonClick = () => {

    const [count, setCount] = useState(0);

    return(
        <View style={{flex:1}}>
          <View style={{flex:1}}>
          <LotsOfGreetings />
          <LotsOfGreetings />
          </View>
          <View style={{flex:1}}>
          <Text> You clicked {count} times</Text>
          <Button style={{flex:1}}
         
            onPress={()=> {
                setCount(count+1);
            
            }
        
        }
                  title="Click Me"
         />
         </View>

        </View>
    );
}

export default ButtonClick