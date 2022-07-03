import React,{Component} from 'react'

 
 const { BlobServiceClient } = require("@azure/storage-blob");
class FileUpload extends Component{
      constructor(props){
          super(props);
          this.onChangeFile=this.onChangeFile.bind(this);
          this.uploadFile = this.uploadFile.bind(this);
          
          this.state = {
            file: null,
          };
          

      }
      onChangeFile(e){
        this.setState({
          file: e.target.value
        })
      }
     
      async uploadFile(){
        const promises=[]
        const containerName = "datapost";
        const account = "miniprojectstorage";

const sasurl = "/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-03-24T04:05:29Z&st=2022-03-23T20:05:29Z&spr=https&sig=KpTVqtlTdmEErt1%2FNkJRZMWDBHWEMiSR2st02wBgu2w%3D";
       
const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sasurl}`);
      
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(this.state.file.name);
     await  blockBlobClient.uploadBrowserData(this.state.file);
       
          console.log("Done");
        /*const Azure_String="DefaultEndpointsProtocol=https;AccountName=miniprojectstorage;AccountKey=UCJYfuGEuDY9B8p9DqZZ5+2GFNK9YsYbp3Vb5nkNq3nigkJcKdkSxskmaB0KScXPblvvDBO5Z3Bn+AStAzlgiw==;EndpointSuffix=core.windows.net";
        const blobServiceCliennt =  BlobServiceClient.fromConnectionString(Azure_String);
        const container = "datapost";
        const containerClient = blobServiceCliennt.getContainerClient(container);
        const blobName = "myblob";
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.uploadBrowserData(this.state.file);
        console.log(uploadBlobResponse.url); 
            */
      }
 
    render(){
      return (
        <div className="App">
          <input type="file"   onChange={this.onChangeFile} />
          <button onClick={()=>this.uploadFile()}>Upload</button>
        </div>
      );
    }
}
 
export default FileUpload;