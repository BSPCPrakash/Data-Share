import React from 'react';
import axios from "axios";
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import User from "./UserData.js";
import RNFetchBlob from 'rn-fetch-blob';
import {RNFS} from "react-native-fs";


export default function Receiver() {
  const getFiles = async()=>{
    const username= User.getUsername();
    const headers = {
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': username
    };
     await axios.get('http://192.168.43.247:7071/api/TransactionData', { headers })
    .then((response) =>{ 
      console.log(response);
        var i=0;
        while(response.data[i]!=undefined){
            checkPermission(response.data[i]);
            console.log("Downloading the files---> Going to next File");
            i=i+1;
        }
       
       
      
    }); 
  
       
}

const checkPermission = async (FILE_URL) => {
 
  if (Platform.OS === 'ios') {
    downloadFile(FILE_URL);
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message:
            'Application needs access to your storage to download File',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Start downloading
        downloadFile(FILE_URL);
        console.log('Storage Permission Granted.');
      } else {
        // If permission denied then show alert
        Alert.alert('Error','Storage Permission Not Granted');
      }
    } catch (err) {
      // To handle permission related exception
      console.log("++++"+err);
    }
  }
};
  const downloadFile = (FILE_URL) => {
    let date = new Date();
    const { config, fs } = RNFetchBlob;
    let dirs = RNFetchBlob.fs.dirs;
    let options = {
      fileCache: true,
      path : dirs.DownloadDir + '/' + date,
      addAndroidDownloads: {
        description: 'downloading file...',
        notification: true,
        useDownloadManager: true, 
        path : dirs.DownloadDir + '/' + date
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
        ToastAndroid.show("File Downloaded",ToastAndroid.SHORT);
        alert('File Downloaded Successfully.');
      }).catch((err)=>{
        ToastAndroid.show("Server Is busy.Try After Sometime",ToastAndroid.SHORT);
        console.log(err)});
  };

    return (
      
  
        <View>
          <Text style={{fontSize: 16}}>Get Your Files</Text>
          <Button title="Get File" onPress={()=>{getFiles()}}/>
        </View>
        
     
    );
  }

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color:`#dc143c`
    },
  });
 
