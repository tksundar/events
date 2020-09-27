import {Button, Text, View} from 'react-native'

function MyElement() {
    return(
   <View foo = 'bar'>
       <Button title='Press Me!'/>
       <Text>Hello WOrld!</Text>
   </View>
    );
}
export default function MyComponent (){

    return (
      
        <View>
              <MyElement />
        <Button title="Press me!" color="#1ACDA5" />
      </View>
    )
}