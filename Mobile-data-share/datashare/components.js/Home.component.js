import FileUpload from "./FileUpload.component";
import React from 'react';

import User from "./UserData.js";
import { NavigationContainer } from '@react-navigation/native';
import Receiver from "./Receiver.component.js";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from "./Profile.component.js";

const Tab = createBottomTabNavigator();
const HomeComponent=({navigation,route,params})=>{
 
    return (
    <NavigationContainer  independent={true}>
      <Tab.Navigator style={{backgroundColor:'blue'}}>
        <Tab.Screen name="Transfer" component={FileUpload}/>
        <Tab.Screen name="History" component={Receiver} />
        <Tab.Screen name="Receive" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
   );
   
};
export default HomeComponent;