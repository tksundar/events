import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Linking} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './Login'
import {EventDetail, Events} from './Events'
import EventRegistration from './EventRegistration';
import NewUser from './NewUser';
import SuccessPage from './SuccessPage';
import RegistrationDetails from './RegistrationDetails'

import ShowMedia from './ShowMedia'
import UploadMedia from "./UploadMedia";
import ChangePassword from "./ChangePassword";
import ForgotPassword from "./ForgotPassword";


import HeaderNavigationBar from "./HeaderNavigationBar";
import ShowProgram from "./ShowProgram";
import AdminViews from "./AdminView";
import ViewRegistrations from "./ViewRegistrations";
import Registrations from "./Registrations";
import AnimatedSplash from "react-native-animated-splash-screen";
import Spinner from "./Spinner";


const App = () => {

    const [loaded, setLoaded] = useState(false)

    const doneLoading = () => {
        setLoaded(true)

    }

    useEffect(() => {
        doneLoading(loaded)
    }, [])

    const Drawer = createDrawerNavigator()

    const getElement = () => {
        if (!loaded) {
            return (
                <Spinner/>
            )
        } else {
            return (
                <NavigationContainer>
                    <Drawer.Navigator initialRoute={"Home"}
                                      drawerStyle={{
                                          width: 200,
                                          height: 300
                                      }}>
                        <Drawer.Screen name="Home" component={Home}/>
                        <Drawer.Screen name="Change Password" component={ChangePassword}/>
                        <Drawer.Screen name="Forgot Password" component={ForgotPassword}/>
                        <Drawer.Screen name="New User" component={NewUser}/>
                        <Drawer.Screen name="Admin" component={AdminViews}/>


                    </Drawer.Navigator>
                </NavigationContainer>
            )
        }
    }

    return (
        getElement()
    )

}

function Title() {
    return (
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'right', color: '#fff'}}>Events</Text>
    );
}

function HeaderLeft(props) {
    return (
        <HeaderNavigationBar {...props} />
    )
}


const Home = ({navigation}) => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Login"
                         screenOptions={{
                             headerStyle: {
                                 backgroundColor: 'rgb(20,20,20)',
                             },

                             headerTintColor: '#ffffff',
                             headerTitleStyle: {
                                 fontWeight: 'bold',
                             },
                         }}
        >
            <Stack.Screen name="Login" component={Login}
                          options={{
                              headerTitle: props => <Title {...props} />,
                              headerLeft: props => <HeaderLeft {...navigation}/>
                          }}/>

            {/*<Stack.Screen name="Register" component={NewUser}*/}
            {/*              options={{*/}
            {/*                  headerTitle: props => <Title {...props} />*/}
            {/*              }}/>*/}
            <Stack.Screen name="Events" component={Events}
                          options={{headerTitle: props => <Title {...props} />}}/>
            <Stack.Screen name="EventDetail" component={EventDetail}
                          options={{headerTitle: props => <Title {...props} />}}/>
            <Stack.Screen name="EventRegistration" component={EventRegistration}
                          options={{headerTitle: props => <Title {...props} />}}/>
            <Stack.Screen name="SuccessPage" component={SuccessPage}
                          options={{headerTitle: props => <Title {...props} />}}/>
            <Stack.Screen name="RegistrationDetails" component={RegistrationDetails}
                          options={{
                              headerTitle: props => <Title {...props} />
                          }}/>
            <Stack.Screen name="ShowMedia" component={ShowMedia}
                          options={{headerTitle: props => <Title {...props} />}}/>
            <Stack.Screen name="UploadMedia" component={UploadMedia}
                          options={{headerTitle: props => <Title {...props} />}}/>
            <Stack.Screen name="ViewProgram" component={ShowProgram}
                          options={{headerTitle: props => <Title {...props} />}}/>
            <Stack.Screen Screen name={"ViewRegistrations"} component={ViewRegistrations}
                          options={{
                              headerTitle: props => <Title {...props} />,
                          }}/>
            <Stack.Screen Screen name={"Registrations"} component={Registrations}
                          options={{
                              headerTitle: props => <Title {...props} />,
                              headerShown: false
                          }}/>


        </Stack.Navigator>


    )
}


export default App
