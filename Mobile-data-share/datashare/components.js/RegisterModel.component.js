import React,{Component} from "react";
import {SafeAreaView,ScrollView,View,StyleSheet,Label,TextInput,Text,ToastAndroid,Button,} from "react-native";
import axios from "axios";



const RegisterModel = ({navigation})=>{
    const [username,setUsername] =React.useState("Username");
    const [password,setPassword]=React.useState("Password");
    const [confirmPassword,setConfirmPassword]= React.useState("Password");
    const [email,setEmail]=React.useState("Email");
    const [device_id,setDeviceId] = React.useState("Device_id");

    const register=async()=>{

        const data1={
            username:username,
            password:password,
            email:email,
            device_id:device_id
        }
        console.log(data1);
       if(password==confirmPassword){
            console.log("Started Networking");
                await axios.post('http://192.168.43.247:7071/api/RegisterFunction',
                        JSON.stringify(data1)
                )
                .then((res)=>{
                    console.log(res);
                    if(res.data=="Registered"){
                        console.log("Registered");
                        navigation.navigate("SignIn");
                    }
                    else if(res.data=="Username is already registered"){
                        ToastAndroid.show("User Already Exists",ToastAndroid.SHORT);
                        console.log("Error in Registering");
                    }
                })
                .catch((err)=>{
                    ToastAndroid.show("Server is Busy",ToastAndroid.SHORT);
                    console.log("Error in networking");
                    console.log(err);
                });
       }
       else{
           console.log("Password and Confirm Password is not correctly typed");
       }
        

    }

    return (
        <SafeAreaView>
            <View>
                <TextInput style={styles.input} onChange={setUsername} value={username} placeholder="username"/>
                <TextInput style={styles.input} onChange={setEmail} value={email} placeholder="email"/>
                <TextInput style={styles.input} onChange={setPassword} value={password} placeholder="password"/>
                <TextInput style={styles.input} onChange={setConfirmPassword} value={confirmPassword} placeholder="Confirm Password"/>
                <TextInput style={styles.input} onChange={setDeviceId} value={device_id} placeholder="Device_id"/>
                <Button title="Register"  onPress={()=>{register();}}/>
                <Button title="SignIn" 
                    onPress={()=>{
                        navigation.navigate('SignIn');
                      }}
                ></Button>
            </View>
        </SafeAreaView>
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

  export default RegisterModel;