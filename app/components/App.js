import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login'
import {Events, EventDetail}  from './Events'
import EventRegistration from './EventRegistration';
import NewUser from './NewUser';

const App = ()=>{
 const Stack = createStackNavigator();
 
    return(
      <NavigationContainer >
          <Stack.Navigator initialRouteName="Login" default>
             <Stack.Screen name="Login" component={Login}
             options={{title: ' Events App :   Login',headerStyle:{backgroundColor:'lightcyan'}}}  />
             <Stack.Screen name="Register" component={NewUser}
             options={{title: ' Events App :   New User Registration',headerStyle:{backgroundColor:'lightcyan'}}} />
             <Stack.Screen name="Events" component={Events} 
             options={{title: ' Events App :   Events',headerStyle:{backgroundColor:'lightcyan'}}} />
             <Stack.Screen name="EventDetail" component={EventDetail}
            options={{title: ' Events App :   Event Details',headerStyle:{backgroundColor:'lightcyan'}}}  />
             <Stack.Screen name="EventRegistration" component={EventRegistration} 
             options={{title: ' Events App :   Event Registration',headerStyle:{backgroundColor:'lightcyan'}}} />
          </Stack.Navigator>    
      </NavigationContainer>
            
        
    )
}

export default App