import React from 'react';
import Home from "./components.js/Home.component.js";
import LoginForm from "./components.js/LoginForm.component";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterModel from './components.js/RegisterModel.component.js';
import ImageUpload from './components.js/ImageUpload.component.js';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
 <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={LoginForm} options={{ title: 'Login' }} />
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="SignUp" component={RegisterModel} />
      </Stack.Navigator>
   </NavigationContainer>


  );
}

