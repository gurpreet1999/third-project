import React, { useEffect } from 'react'
import "./MovieList.css"

const MovieList = () => {

    const fetchMovie=async()=>{

     const data=   await fetch('http://localhost:5000/api/all-movie/2023-06-25 20-13-17.mkv',{
            method:"GET"
        })

        const response=await data.json()
        console.log(response)
    }


    useEffect(()=>{
  
    },[])

const deleteMovieFromS3=async()=>{
  const key='video.mp4'
 const data=  await fetch('http://localhost:5000/api/delete-s3-resource/'+ key,{
    method:"DELETE"
})

const response=await data.json()
console.log(response)

}

  return (
    <>

    <button onClick={deleteMovieFromS3}  >
        delete
    </button>
    </>
  )
}

export default MovieList