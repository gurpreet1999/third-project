import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Watch = () => {
  const [url,seturl]=useState('')


  const params=useParams()
  const {id}=params

  const fetchMovieDetail=async()=>{

    const data=await fetch(`http://localhost:5000/api/movie/${id}`)

       const {movies}=await data.json()
       console.log(movies)
       seturl(movies.url
        )
   }

useEffect(()=>{

fetchMovieDetail()
},[id])

  return (
    <div style={{display:"flex"}}>
   <video src={url}  height={"800px"} width={"900px"} autoPlay  controls/>
   <div>
  <h1>"Enjoy uninterrupted video streaming powered by AWS S3 and enhanced by CloudFront's lightning-fast content delivery, ensuring a seamless and delightful viewing experience."</h1>
<br/>
<h2>using AWS Cloudfront to stream buffering free :-</h2>
<br/>

  <p>CloudFront's global network strategically positions servers around the world, reducing the distance data travels. By caching content closer to viewers, it minimizes latency, accelerates data transfer, and optimizes video streaming, ensuring a silky-smooth and buffer-free entertainment experience</p>
  </div>
   </div>
  )
}

export default Watch