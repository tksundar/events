import React, {useState} from 'react';
import { Button, View, Text,TouchableHighlight,Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AnimatedSplash from "react-native-animated-splash-screen";


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

    const [isLoaded,setIsLoaded] = useState(false)

    const setLoaded =  ()=>{
        setLoaded(true)

    }

    useEffect(() => {
        setIsLoaded(isLoaded)
    }, false)


  return (
      <AnimatedSplash
          translucent={true}
          isLoaded={isLoaded}
          logoImage={require("./app/images/event-icon.png")}
          backgroundColor={"#262626"}
          logoHeight={150}
          logoWidth={150}
      >
          <NavigationContainer>
              <Drawer.Navigator initialRouteName="Home">
                  <Drawer.Screen name="Home" component={HomeScreen}/>
                  <Drawer.Screen name="Notifications" component={NotificationsScreen}/>
              </Drawer.Navigator>
          </NavigationContainer>
      </AnimatedSplash>
  )
}