import React, { useEffect, useRef, useState } from 'react'
import "./MovieUpload.css"

const MovieUpload = () => {

const buttonRef=useRef(null)
const [url,seturl]=useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedParts,setUploadedParts]=useState([])
     const uploadId = useRef(null);
     const [isCompleted,setIsCompleted]=useState(false)
     const handleFileChange = (event) => {
       setSelectedFile(event.target.files[0]);


     };
   
useEffect(()=>{

})

   useEffect(()=>{
   
     if(isCompleted){
       console.log("jjd")
       completeMultipartUpload()
     }
   
   },[isCompleted])
   
   
     const startMultipartUpload = async () => {
       if (!selectedFile) return;
   
       const response = await fetch("http://localhost:5000/api/start-upload", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           key: selectedFile.name,
           contentType: selectedFile.type,
         }),
       });
   
       const data = await response.json();
       console.log(data);
       uploadId.current = data.uploadId;
     };
   
     const uploadPart = async (partNumber, data) => {
       const formData = new FormData();
       formData.append("key", selectedFile.name);
       formData.append("partNumber", partNumber);
       formData.append("uploadId", uploadId.current);
       formData.append(
         "data",
         new Blob([data], { type: "application/octet-stream" })
       );
   
       const response = await fetch("http://localhost:5000/api/upload-part", {
         method: "POST",
   
         body: formData,
       });
   
       const responseData = await response.json();
       console.log(responseData);
   
       
       setUploadedParts((prev)=>[...prev,{PartNumber:partNumber,ETag:responseData.message.ETag}])
       return responseData.message.ETag;
     };
   
     const handleUpload = async () => {
       if (!selectedFile) return;
   
       const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size (adjust as needed)
       const fileReader = new FileReader();
   
       let partNumber = 0; // Initialize the part number
       await startMultipartUpload();
   
       fileReader.onload = async (event) => {
         const chunk = event.target.result;
         partNumber++;
   
       const eTag = await uploadPart(partNumber, chunk);
       console.log(`Uploaded part ${partNumber}, ETag: ${eTag}`);
        
       
         console.log("part numver",partNumber )
       console.log("current chunk",chunk)
       console.log("totalsize",selectedFile.size)
       console.log("curremtsizwe",partNumber*CHUNK_SIZE)
         if (partNumber * CHUNK_SIZE < selectedFile.size) {
           console.log("enter")
           const nextSlice = selectedFile.slice(
             partNumber * CHUNK_SIZE,
             (partNumber + 1) * CHUNK_SIZE
           );
             
           fileReader.readAsArrayBuffer(nextSlice);
         } else {
           
       setIsCompleted(true)
         
         
         }
       };
   
       fileReader.readAsArrayBuffer(selectedFile.slice(0, CHUNK_SIZE));
     };
     const completeMultipartUpload = async () => {
       console.log("Final uploaded parts:", uploadedParts);
   
       const response = await fetch('http://localhost:5000/api/complete-upload', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           key: selectedFile.name,
           uploadId: uploadId.current,
           parts:uploadedParts
   
         }),
       });
   
       const data=await response.json()
       console.log('Multipart upload completed:',data);


       seturl(data.url)
       
         

     };
const inputRef=useRef(null)

const handleInputOpen=()=>{
  inputRef.current.click()
}

  return (
    <div className='center-div'  >
    <div class="wrapper" onClick={handleInputOpen} >
    <header>File Uploader JavaScript</header>
    <form action="#">
      <input class="file-input" ref={inputRef}  type="file" name="file" hidden  onChange={handleFileChange}   />
     
      <i class="fas fa-cloud-upload-alt"></i>
      <p>Browse File to Upload</p>
    </form>
    <section class="progress-area"></section>
    <section class="uploaded-area"></section>
  </div>
 
  <button   ref={buttonRef} onClick={handleUpload}>Upload</button>

  {uploadProgress < 100 ? (
  <div className="progress-bar"   >
    <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
    <p>{`Uploading... ${uploadedSizeInMB.toFixed(2)}MB / ${totalSizeInMB.toFixed(2)}MB`}</p>
  </div>
) : (
  <p>Upload completed!</p>
)}


  </div>
  )
}

export default MovieUpload