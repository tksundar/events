import 'react-native-gesture-handler';
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login'
import {EventDetail, Events} from './Events'
import EventRegistration from './EventRegistration';
import NewUser from './NewUser';
import SuccessPage from './SuccessPage';
import RegistrationDetails from './RegistrationDetails'
import MenuComponent from './MenuComponent'
import ShowMedia from './ShowMedia'
import UploadMedia from "./UploadMedia";

const App = () => {
    const Stack = createStackNavigator();

    const media = () => {
        return (
            <MenuComponent/>
        )
    }


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" default>
                <Stack.Screen name="Login" component={Login}
                              options={{title: 'Login', headerTitleAlign: 'center'}}/>
                <Stack.Screen name="Register" component={NewUser}
                              options={{title: 'New User Registration', headerTitleAlign: 'center'}}/>
                <Stack.Screen name="Events" component={Events}
                              options={{title: 'Events', headerTitleAlign: 'center'}}/>
                <Stack.Screen name="EventDetail" component={EventDetail}
                              options={{title: '  Event Details', headerTitleAlign: 'center'}}/>
                <Stack.Screen name="EventRegistration" component={EventRegistration}
                              options={{title: '   Event Registration', headerTitleAlign: 'center'}}/>
                <Stack.Screen name="SuccessPage" component={SuccessPage}
                              options={{title: '   Action Status', headerTitleAlign: 'center'}}/>
                <Stack.Screen name="RegistrationDetails" component={RegistrationDetails}
                              options={{title: '   Registration Details', headerTitleAlign: 'center'}}/>
                <Stack.Screen name="ShowMedia" component={ShowMedia}
                              options={{title: '   View  Media', headerTitleAlign: 'center'}}/>
                <Stack.Screen name="UploadMedia" component={UploadMedia}
                              options={{title: '   Upload  Media', headerTitleAlign: 'center'}}/>

            </Stack.Navigator>
        </NavigationContainer>


    )
}

export default App