import {StyleSheet} from "react-native";

/**
 * Created by tksrajan@gmail.com
 */


const styles = StyleSheet.create({
    hflex: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        alignItems: "flex-start",
        justifyContent: "space-evenly"
    },

    vFlex: {
        flexDirection: 'column',

        justifyContent: 'space-evenly'
    },

    banner: {
        flex: 0.2,
        justifyContent: 'center',
        backgroundColor: 'grey',
        alignItems: 'flex-end',
        margin: 10,
    },
    item: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        color: 'black',
        margin: 10
    },
    label: {
       color: 'black',

    },
    topBanner: {
        backgroundColor: 'rgb(20,20,20)',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50
    },

    userStyle: {
        height: 20,
        color: '#fff',
        fontSize: 15,
        marginRight: 15
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#8c85a3",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin:5
    },
    appButtonText: {
        fontSize: 10,
        color: "#ffffff",
        fontWeight: "bold",
        alignSelf: "center",
        // textTransform: "uppercase"
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: "95%",
        height: 20,
        margin: 5
    },
    url: {
        width: '40%',
        marginLeft: 10
    },
    button: {
        width: "20%",
        alignItems: 'stretch',
    },
    link: {
        width: '50%',
        margin: 20,
        color: 'blue',

    },
    clrGrey: {
        backgroundColor: "#d9e3f0"
    },
    clrCyan: {
        backgroundColor: "white"
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 10
    }

})

export default styles
