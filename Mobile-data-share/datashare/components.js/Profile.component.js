import React from "react";
import {View,SafeAreaView,Text,Image,Button} from "react-native";
import LoginForm from "./LoginForm.component";
import User from "./UserData.js"
const Profile=({navigation,data})=> {
    const username=User.getUsername();
    
        return (
            <View>
                    <Text style={styles.input}>{username}</Text>
                    <Button title="Sign Out"
                    onPress={()=>{
                        this.props.navigation.navigate(component={LoginForm});
                    }}/>
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
 
export default Profile;