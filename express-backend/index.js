const { BlobClient } = require('@azure/storage-blob')
var express = require('express')

require('dotenv/config')




var app = express()
var PORT = 3000
var azure = require('azure-storage');
var azureStorage  =  require('@azure/storage-blob')



app.get("/",(req,res)=>{
    var blobSvc = azure.createBlobService(process.env.AZURE_CONNECTION_STRING);
    blobSvc.getContainerAcl("appfiles",()=>{
        console.log("Container connected!")
    })
    blobSvc.createBlockBlobFromLocalFile('appfiles', 'myblob', 'C:\Users\91955\Documents\GitHub\Data-Share\express-backend\package.json', function(error, result, response){
        if(!error){
          // file uploaded
          console.log("error occured+${error}");
        }
        else{
            
            console.log("Successfully uploaded");
        }
      });
    res.send("Get endpoint is fired")
})
app.listen(PORT,()=>{
    console.log("Heloo World at ${PORT}")
})
