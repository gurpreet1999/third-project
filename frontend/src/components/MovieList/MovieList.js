import React, { useEffect, useState } from 'react'
import "./MovieList.css"
import { Link } from 'react-router-dom'
import "./MovieList.css"

const MovieList = () => {

  const [movie,setMovie]=useState('')

    const fetchMovie=async()=>{

     const data=await fetch('http://localhost:5000/api/get-all-movie')

        const response=await data.json()
        console.log(response)
        setMovie(response.movies)
    }


    useEffect(()=>{
      fetchMovie()
    },[])

const deleteMovieFromS3=async()=>{
  const key='video.mp4'
 const data=  await fetch('http://localhost:5000/api/delete-s3-resource/'+ key,{
    method:"DELETE"
})

const response=await data.json()
console.log(response)

}

const converToMb=(size)=>{
return size/(1024*1024)
}
console.log(movie)
  return (
    <>
{
  movie && movie.map((item)=>{
    return (
      <section class="uploaded-area">
      <Link to={`/watch/${item._id}`}>
       <li class="row">
      <div class="content upload">
        <i class="fas fa-file-alt"></i>
        <div class="details">
          <span class="name">{item?.name} • Uploaded</span>
          <span class="size">{converToMb(item?.size).toFixed(2)} Mb</span>
        </div>
      </div>
      <i class="fas fa-check"></i>
    </li>
    </Link> 
    </section>
    )
  })
}

 
    </>
  )
}

export default MovieList