import React from "react";
import {Image, TouchableHighlight, View} from "react-native";


class HeaderNavigationBar extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)

    }
    render() {
        return (<View style={{
            height: 70,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <TouchableHighlight style={{marginLeft: 10, margin: 15}}
                                onPress={() => {
                                    this.props.openDrawer()
                                }}>
                <Image
                    style={{width: 32, height: 32}}
                    source={require('../images/drawer_icon.png')}
                />
            </TouchableHighlight>
        </View>);
    }
}

export default HeaderNavigationBar