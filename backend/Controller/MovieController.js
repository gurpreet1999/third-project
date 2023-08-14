
require('dotenv').config();
const { S3Client, CreateMultipartUploadCommand,UploadPartCommand , CompleteMultipartUploadCommand, DeleteObjectCommand, HeadObjectCommand} = require('@aws-sdk/client-s3');
const {CloudFrontClient,CreateInvalidationCommand} =require("@aws-sdk/client-cloudfront")
const MOVIE = require('../modals/Movie.js');


const cloudFront=new CloudFrontClient({
  credentials:{
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY
  }
})
const config = {
    region:process.env.REGION,
    credentials: {
      accessKeyId:process.env.ACCESS_KEY_ID,
      secretAccessKey:process.env.SECRET_ACCESS_KEY
    }
  }



const startUploadChunk=async(req,res)=>{

    try{
        const s3 = new S3Client(config);
        const params = {
            Bucket:process.env.BUCKET,
            Key:req.body.key,
            ContentType:req.body.contentType,
          };
        const data = await s3.send(new CreateMultipartUploadCommand(params));
        return res.status(200).json({ uploadId: data.UploadId });
    }
   catch(err){
    console.error('Error starting upload:', err);
    return res.status(500).json({ error: 'An error occurred while starting the upload.' });
   }


}

const uploadSingleChunkOneByOne=async(req,res)=>{
    try {
        // Create an instance of the S3 client 
        const s3 = new S3Client(config);
    
        // Extract binary data from the uploaded file
        const binaryData = req.file.buffer;
    
        // Prepare the parameters for uploading a part
        const params = {
          Bucket:process.env.BUCKET,
          Key: req.body.key,
          PartNumber: req.body.partNumber,
          UploadId: req.body.uploadId,
          Body: binaryData,
        };
    
        // Create and send the UploadPart command
        const command = new UploadPartCommand(params);
        const data = await s3.send(command);
    
     

        // Return a response with the uploaded part information
        res.status(200).json({ message: data });
      } catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error uploading part:', error);
        res.status(500).json({ error: 'An error occurred while uploading the part.' });
      }
}

const completeUploadAndAssembleChunk=async(req,res)=>{
  
    try{
        const s3 = new S3Client(config);

        // Extract relevant data from the request body
        const { parts, key, uploadId } = req.body;
        const params = {
          Bucket:process.env.BUCKET,
            Key: key,
            MultipartUpload: {
              Parts: parts,
            },
            UploadId: uploadId,
          };

          const data = await s3.send(new CompleteMultipartUploadCommand(params));

         

          const nameOfFile=data.Key
          const headObjectCommand = new HeadObjectCommand({
            Bucket:process.env.BUCKET,
            Key:nameOfFile
          });
        const size=  await  s3.send(headObjectCommand)
      

          const image=data.Key
          const url=`https://d1jdpjq1rnefan.cloudfront.net/${image}`;


           let movieurl= await MOVIE.create({
                     url:url,
                     name:nameOfFile,
                     size:size.ContentLength

           })

          return res.status(200).json({movieurl});

    
    }
    catch(err){
  console.error('Error completing multipart upload:', err);
    return res.status(500).json({ error: 'An error occurred while completing the upload.' });
    }
}



const deleteS3ResourceFromBucket=async(req,res)=>{

    try {
        console.log(req.params)
        // Create an instance of the S3 client with the provided config
        const s3 = new S3Client(config);
    
        // Extract the S3 object key from the request parameter
        const  key  = req.params.key;
      
    console.log(key)
        // Prepare parameters for deleting the S3 object
        const params = {
          Bucket:process.env.BUCKET,
          Key:key
        };
    
        // Delete the S3 object
        await s3.send(new DeleteObjectCommand(params));
        const invalidationParams={
          DistributionId:process.env.DISTRIBUTIONID,
          InvalidationBatch:{
            CallerReference:key
          },
          Paths:{
            Quantity:1,
            Items:[
              '/'+key
            ]
          }
        }
      
const invalidationCommand=new CreateInvalidationCommand(invalidationParams)
await cloudFront.send(invalidationCommand)

        res.status(200).json({ message: 'S3 resource deleted successfully' });
      } catch (error) {
        
        console.error('Error deleting S3 resource:', error);
        res.status(500).json({ error: 'An error occurred while deleting the resource.',error });
      }

}


const getAllMovie=async(req,res)=>{

    try {
        const data = await MOVIE.find({});
        res.json({ movies: data });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

const fetchMovieDetail=async(req,res)=>{

  try {
    const id=req.params.id
      const data = await MOVIE.findById(id);
      res.json({ movies: data });
  } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ error: 'Internal server error' });
  }

}

module.exports={fetchMovieDetail,getAllMovie,startUploadChunk,uploadSingleChunkOneByOne,completeUploadAndAssembleChunk,deleteS3ResourceFromBucket}


