import React, {Component} from "react";
import {Alert, Image, PermissionsAndroid, ToastAndroid, TouchableOpacity} from "react-native";
import {ProgressBar} from '@react-native-community/progress-bar-android'
import RNFetchBlob from "rn-fetch-blob";

export default class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            loading: false
        };
    }

    actualDownload = () => {
        this.setState({
            progress: 0,
            loading: true
        });
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob.config({
            // add this option that makes response data to be stored as a file,
            // this is much more efficient.
            path: dirs.DownloadDir + "/path-to-file.png",
            fileCache: true
        })
            .fetch(
                "GET", this.props.uri,
                {
                    //some headers ..
                }
            )
            .progress((received, total) => {
                console.log("progress", received / total);
                this.setState({progress: received / total});
            })
            .then(res => {
                this.setState({
                    progress: 100,
                    loading: false
                });
                ToastAndroid.showWithGravity(
                    "Your file has been downloaded to downloads folder!",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            }).catch((error) => {
            alert('Error Downloading file from ', this.props.uri)
        });
    };

    async downloadFile() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Storage Permission",
                    message: "App needs access to external storage to download the file "
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.actualDownload();
            } else {
                Alert.alert(
                    "Permission Denied!",
                    "You need to give storage permission to download the file"
                );
            }
        } catch (err) {
            console.warn(err);
        }
    }

    getElement = () => {
        if (this.state.loading) {
            return (<ProgressBar
                styleAttr="Horizontal"
                indeterminate={false}
                progress={this.state.progress}
            />)
        } else {
            return (
                <TouchableOpacity onPress={() => this.downloadFile()}>
                    <Image source={require('../images/download-icon.png')}/>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (this.getElement())
    }
}

