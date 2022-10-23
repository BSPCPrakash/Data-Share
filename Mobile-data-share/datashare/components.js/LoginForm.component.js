import React from "react";
import { SafeAreaView, StyleSheet, TextInput ,Button,ToastAndroid} from "react-native" ;
import axios from "axios";
import User from "./UserData.js";
const LoginForm = ({navigation}) => {
  const [text, onChangeText] = React.useState("Username");
  const [number, onChangeNumber] = React.useState("Password");

  const login=async()=>{
         const data = {
           username : text,
           password:number 
         }
        
          await axios.post('http://192.168.43.247:7071/api/AuthenticationFunction',
            JSON.stringify(data)
          )
          .then((res)=>{
              console.log(res)
              var praks = res;
              console.log(praks);
              console.log(praks[0])
              if (praks.status==500){
                ToastAndroid.showWithGravity("Server Side Error",ToastAndroid.SHORT,ToastAndroid.CENTER);
                console.log("Sever Side Error");
              }
              if(praks["data"]=="Correct"){
                ToastAndroid.showWithGravity("Logging In",ToastAndroid.SHORT,ToastAndroid.CENTER);
                console.log(text);
                User.setUsername(text);
                navigation.replace('Home',{"username":praks.username});
              }
              else if(praks["data"]!="Correct"){
                console.log("Not Authorized");
                ToastAndroid.show("Invalid Credentials",ToastAndroid.SHORT);
              }
              else{
                ToastAndroid.show("Check Your Network Connection",ToastAndroid.SHORT);
                ToastAndroid.show("Server Is busy.Try After Sometime",ToastAndroid.SHORT);
              } 
          })
          .catch((err)=>{
            ToastAndroid.show("Server Is busy.Try After Sometime",ToastAndroid.SHORT);
            console.log(err)
          });
         
}
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        secureTextEntry={true}
        placeholder="Password"
      />
      <Button
      title="LogIn"
      onPress={()=>{
       login();
      }}
      />
      <Button title="Register" onPress={()=>{ navigation.navigate("SignUp");}}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:`#dc143c`
  },
});

export default LoginForm;