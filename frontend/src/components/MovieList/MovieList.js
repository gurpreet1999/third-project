import React, { useEffect, useState } from 'react'
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
console.log(movie)
  return (
    <>
   <div></div>
    <button onClick={deleteMovieFromS3}  >
        delete
    </button>
    </>
  )
}

export default MovieList