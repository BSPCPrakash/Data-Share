
import React from "react";


import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';

 const ImageUpload=()=> {
     pickImage=async()=>{
         const res=null;
        const result = await launchCamera(options,(response)=>{
            console.log("Camera is launched");
            console.log(response.assets);
            res={
                uri:response.assets.uri,
                name:response.assets.fileName,
                type:response.assets.type
            }
        });
        const options={
            bucket:"datasharebucket",
            region:'us-west-1',
            accessKey:"AKIARW6H7ZMAC23JUZWP",
            secretKey:"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",
            successActionStatus:201
          }
          
         RNS3.put(res,options)
          .then((response)=>{
            console.log(response);
            console.log(response.body.postResponse.loaction);
          })
          .catch((err)=>{
            console.log(err);
          })
     }
  return(
    <SafeAreaView>
        <TouchableOpacity onPress={this.pickImage.bind(this)}>
            <Text>Pick an Image</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}
export default ImageUpload;
