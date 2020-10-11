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
      item1: {
        width: 300,
        borderColor: 'gray',
          backgroundColor:'#fff',
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
     appButtonContainer1: {
        elevation: 8,
        backgroundColor: "azure",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin:5
    },
    appButtonText: {
        fontSize: 10,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        // textTransform: "uppercase"
    },
     appButtonText1: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
         color: "blue"
        // textTransform: "uppercase"
    },
     appButtonText2: {
        fontSize: 10,
        fontWeight: "bold",
        alignSelf: "center",
         color:'blue'
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
    eventItem: {
        width: '30%',
        marginLeft: 40
    },
    itemValue:{
          width: '80%',
    },
    button: {
        width: "20%",
        alignItems: 'stretch',
    },
    link: {
         width: '78%',
        fontSize: 11,
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
    },
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: 'darkgrey',
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: 'azure',
    },
    parentHr:{
        height:1,
        color: 'white',
        width:'100%'
    },
    child:{
        backgroundColor: 'lightgrey',
        padding:16,
    }


})

export default styles
