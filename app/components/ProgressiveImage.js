import React , {Component} from 'react'
import {Image, StyleSheet} from 'react-native'


 const styles = StyleSheet.create({
        imageOverlay: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
        },
        container: {
            backgroundColor: '#e1e4e8',
        },
    });
class ProgressiveImage extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return(
            <Image style={styles.container}
                   {...this.props} />
        )
    }
}

export  default ProgressiveImage