import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  Button
} from 'react-native';

import S3 from "aws-sdk/clients/s3";
import { Credentials } from "aws-sdk";
import { v4 as uuid } from "uuid";
import DocumentPicker from 'react-native-document-picker';
import axios from "axios";

const  FileUpload=()=>{
  const [deviceId,setDeviceId]=React.useState("Receiver Username");
  const [res,setSingleFile]=useState(null);
 



  const selectOneFile = async () => {
    try {
                console.log("hello world1");
              
                await DocumentPicker.pickSingle({
                  type: [DocumentPicker.types.allFiles],
                }).then((response)=>{
                  console.log(response);
                      const file={
                        uri:response.uri,
                        name:response.name,
                        type:response.type
                      }
                      console.log(file);
                      setSingleFile(file);
                    console.log("Control Came here");
                    ToastAndroid.show("File Selected",ToastAndroid.SHORT);
                })
                .catch((error)=>{
                  console.log("File Not picked");
                  ToastAndroid.show("File Not Selected",ToastAndroid.SHORT);
                  console.log(error);
                });
    }
     catch (err) {
              if (DocumentPicker.isCancel(err)) {
                ToastAndroid.show("File Picker Not responding",ToastAndroid.SHORT);
                alert('Canceled from single doc picker');
              } else {
              
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
              }
    }
};
const uploadFile=async()=>{
  console.log(deviceId);
            const access = new Credentials({
                accessKeyId: "",
                secretAccessKey: "",
            });
            const s3 = new S3({
              credentials: access,
              region: "us-east-1", //"us-west-2"
              signatureVersion: "v4",
            });
            const fileId = uuid();
            const signedUrlExpireSeconds = 60 * 15;
            const url = await s3.getSignedUrlPromise("putObject", {
                  Bucket: "datashaarebucket",
                  Key: `${fileId}`+deviceId,
                  ContentType: res.type,
                  Expires: signedUrlExpireSeconds,
            });
            let Blob = await fetch(res.uri);
            let sendBlob = await Blob.blob();
             await  fetch(url, {
                        method: "PUT",
                        body: sendBlob,
                        headers: {
                          'Content-Type': res.type
                        }
                      }).then((serres)=>{
                        if(serres.status==200){
                          console.log("Uploading Done");
                          saveEntry(fileId,access,s3);

                          ToastAndroid.show("File Sent",ToastAndroid.SHORT);
                        }
                        else{
                          ToastAndroid.show("File Not Sent",ToastAndroid.SHORT);
                          console.log("we have got a problem with uploading");
                          console.log(serres);
                        } 
                      })
                      .catch((err)=>{
                        ToastAndroid.show("File Not Sent",ToastAndroid.SHORT);
                        console.log(err);
                       });
}

const saveEntry=async (fileId,access,s3)=>{

              const downloadurl = await s3.getSignedUrlPromise("getObject", {
                Bucket: "datashaarebucket",
                Key: `${fileId}`+deviceId,
                Expires:  60 * 15,
            });

            const data={
                receiver_id:deviceId,
                downloadUrl:downloadurl
            }
            console.log(deviceId);
            await axios.post('http://192.168.43.247:7071/api/TransactionData',
              JSON.stringify(data)
            )
            .then((response)=>{
              console.log(response);
            })
            .catch((error)=>{
              console.log(error);
            });
                      console.log(downloadurl);
                      console.log(fileId);
                      console.log(s3);
                      console.log(access);
}
  return (
      <View style={styles.container}>
                 <TextInput
       style={styles.input}
        onChangeText={setDeviceId}
        value={deviceId}
        placeholder="Receiver Username"
      />
                  <Text>Select A File</Text>
                  <Button
                    title="select file"
                    activeOpacity={0.5}
                    onPress={selectOneFile}>
                  </Button>
                  <View
                    style={{
                      backgroundColor: 'grey',
                      height: 2,
                      margin: 10
                    }} />
                  <Button activeOpacity={0.5} 
                      title="Send File"
                  
                      onPress={uploadFile}
                  ></Button>  
      </View>
  );
};

export default FileUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:`#dc143c`
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});

