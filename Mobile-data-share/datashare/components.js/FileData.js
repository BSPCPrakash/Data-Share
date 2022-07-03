import axios from "axios";
import User from "./UserData.js";
export default class FileDetails{
    static arr= new Array();
     async getFiles(){
        const username= User.getUsername();
        const headers = {
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': username
        };
         await axios.get('http://192.168.29.247:7071/api/TransactionData', { headers })
        .then((response) =>{ 
            var i=0;
            while(response.data[i]!=undefined){
                this.arr.push(response.data[i]);
                i=i+1;
            }
            console.log(arr[0]);
        }).catch((err)=>{
            console.log(err);
            return arr;
        }); 
        console.log("<-----Program came here --->");
        return this.arr;
    }
}