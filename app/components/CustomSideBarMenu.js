/**
 * Created by tksrajan@gmail.com on
 */
import React from 'react'
import {View,Text,StyleSheet,} from 'react-native'
import Icon from "react-native-vector-icons/RNIMigration";

const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
});
const CustomSideBarMenu = ({navigation}) => {

    const profileImage = "../images/avatar.png"

    const items = [
      {
        navOptionThumb: 'camera',
        navOptionName: 'First Screen',
        screenToNavigate: 'NavScreen1',
      },
      {
        navOptionThumb: 'image',
        navOptionName: 'Second Screen',
        screenToNavigate: 'NavScreen2',
      },

    ];
    return (
        <View>
            <View style={styles.sideMenuContainer}>
                {/*Top Large Image */}
                <Image
                    source={{uri: profileImage}}
                    style={styles.sideMenuProfileIcon}
                />
                {/*Divider between Top Image and Sidebar Option*/}
                <View
                    style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#e2e2e2',
                        marginTop: 15,
                    }}
                />
                <View style={{width: '100%'}}>
                    {items.map((item, key) => (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: 10,
                                paddingBottom: 10,
                                backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
                            }}
                            key={key}>
                            <View style={{marginRight: 10, marginLeft: 20}}>
                                <Icon name={item.navOptionThumb} size={25} color="#808080"/>
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: global.currentScreenIndex === key ? '#ff0000' : '#000000',
                                }}
                                onPress={() => {
                                    global.currentScreenIndex = key;
                                    navigation.navigate(item.screenToNavigate);
                                }}>
                                {item.navOptionName}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
            );
            }
            }
        </View>
    )
}

export default CustomSideBarMenu
