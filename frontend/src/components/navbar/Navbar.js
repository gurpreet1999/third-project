import React, { useState } from 'react'
import { Bell , MagnifyingGlass ,CaretDown} from "@phosphor-icons/react";
import "./navbar.css"

const Navbar = () => {

const [isScrolled,setIsScrolled]=useState(false)
window.onscroll=()=>{
    setIsScrolled(window.pageYOffset===0 ? false :true)
    return ()=>window.onscroll=null // i have written this a return function because otherwise it will become a loop
}

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
    <div className="container">
      <div className="left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
        />
        <span>Homepage</span>
        <span>Series</span>
        <span>Movies</span>
        <span>New and Popular</span>
        <span>My List</span>
      </div>
      <div className="right">
      <MagnifyingGlass size={32}   className="icon" />
        <span>KID</span>
        <Bell size={32}  className="icon"  />
        <img
          src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <div className="profile">
        <CaretDown size={32}  className="icon"/>
          <div className="options">
            <span>Settings</span>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Navbar