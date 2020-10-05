// import React, {useState} from 'react';
// import {Button, StyleSheet, Text, View} from 'react-native';
//
// const Styles = StyleSheet.create({
//
//     center: {
//         alignItems: "center"
//     }
// });
//
// const Greetings = (props) => {
//
//     return (
//         <View style={Styles.center}>
//             <Text>Hello, {props.name}</Text>
//         </View>
//     );
// }
//
// const LotsOfGreetings = () => {
//     return (
//         <View style={[Styles.center, {top: 50}]}>
//
//             <Greetings name="Rexaar"/>
//             <Greetings name="Babu"/>
//             <Greetings name="piku"/>
//
//         </View>
//     )
// }
//
// const ButtonClick = () => {
//
//     const [count, setCount] = useState(0);
//
//     return (
//         <View style={{flex: 1}}>
//             <View style={{flex: 1}}>
//                 <LotsOfGreetings/>
//                 <LotsOfGreetings/>
//             </View>
//             <View style={{flex: 1}}>
//                 <Text> You clicked {count} times</Text>
//                 <Button style={{flex: 1}}
//
//                         onPress={() => {
//                             setCount(count + 1);
//
//                         }
//
//                         }
//                         title="Click Me"
//                 />
//             </View>
//
//         </View>
//     );
// }
//
// export default ButtonClick

import React from 'react';
import { Button, View, Text,TouchableHighlight,Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


class HeaderNavigationBar extends React.Component {
    render() {
        return (<View style={{
            height: 70,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <TouchableHighlight style={{ marginLeft: 10, marginTop: 15 }}
                onPress={() => { this.props.navigation.openDrawer() }}>
                <Image
                    style={{ width: 32, height: 32 }}
                    source={require('./drawer_icon.png')}
                />
            </TouchableHighlight>
        </View>);
    }
}

function HomeScreen(props) {
  return (
      <View style={{
            flex: 1,
            flexDirection: 'column',
        }}>
        <HeaderNavigationBar {...props} />
            <View style={{
                flex: 1,
                backgroundColor: '#4885ed',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
      <Text style={{textAlign: 'center', marginTop: 300}}>
        Home Screen
      </Text>
    </View>
      </View>
  );
}
function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
      onPress={() => navigation.goBack()}
      title="Go back home"
      />
    </View>
  );
}
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}