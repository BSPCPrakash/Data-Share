import {View,SafeAreaView,Text,TextInput,FileInput,Button, Pressable} from 'react-native';


import React, { Component } from 'react';
import axios from 'axios';

class HomeScreen1 extends React.Component {
    constructor(props){
        super(props);

        this.state={
            demo_text:" "
        }

    }
     handlePress=()=>{
        const {demo_text}=this.state;
       
        fetch('https://testserverproject.azurewebsites.net/api/HttpTrigger1?code=/gCrFIYqs57XNZDXKGUF12TJYM/m4gvvOyEONYhQ4gcLTyyV8/vKuw==',{
          method: 'POST',
          body: JSON.stringify({
            demo_text
          }),
          headers: {"Content-Type": "application/json"}
        })
        .then(function(response){
          console.log(JSON.parse(response.body));
       
        }).catch(error => console.log(error));
    }
    render(){
  return (
    <SafeAreaView>
          <Text>HomeScreen</Text>
          <TextInput placeholder='Username'
          onChangeText={(demo_text)=>this.setState({demo_text})}
          value={this.state.demo_text}
          />
         
          <Button title="Submit"  onPress={this.handlePress} />
    </SafeAreaView>
  )
    }
}

export default HomeScreen1;