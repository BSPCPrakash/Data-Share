
const mongoose = require("mongoose");

const express = require("express");
var fileupload = require("express-fileupload");
const {BlobServiceClient} = require("@azure/storage-blob");

// Create app instance
const app = express();
app.use(express.json());

// Register and set up the middleware
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));

const entry = mongoose.Schema({
    username:String,
    password:String
});

const userEntry = mongoose.model('entry',entry);


const transaction = mongoose.Schema({
    device_id:String,
    receive_id:String,
    file_url:String,
});

const transEntry = mongoose.model("Transaction",transaction);

const Azure_String = process.env['Azure_Connection_String'];
// Request handler/endpoint
app.get("/login",async(req,res)=>{
      try{
            
            let username1 = req.body.username;
            let password1 = req.body.password;
            let msg ="";
            const verifyData = await userEntry.find({username:username1});
            if(password1==verifyData[0].password){
                    msg="Correct";
            }
              
            res.send({
              status:true,
              message:msg
            });
           
      }
      catch(err){
        console.log(err);
        res.send({
          status: false,
          message: 'Not Authorized'
      });
      }
});
app.get("/register",async(req,res)=>{
    try{

        const newEntry = new userEntry(req.body);
            await newEntry.save()
            .then(()=>{
                res.send({
                    status:true,
                    message:"User  registered"
                });
            })
            .catch(()=>{
                res.send({
                    status:false,
                    message:"User not registered"
                });
            });

    }
    catch(err){
        console.log(err);
        res.send({
            status:false,
            message:"User not registered"
        });
    }

});
app.post("/upload", async (req, res) => {
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let avatar = req.files.avatar;
        
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        avatar.mv('./uploads/' + avatar.name);

        //send response
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: avatar.name,
                mimetype: avatar.mimetype,
                size: avatar.size
            }
        });
    }
} catch (err) {
    res.status(500).send(err);
}
});

// Start up the server
mongoose.connect("mongodb+srv://saiprakash:9550948629@cluster0.hcqxn.mongodb.net/Users?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    app.listen(5000, ()=>{
        console.log("Server is running at the port ");
    });
  
})
.catch(error=>{
    console.log("error: ",error.message);
});
