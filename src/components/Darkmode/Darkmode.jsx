import React, { useEffect } from 'react'
import { useState } from 'react'
import { GoSun } from "react-icons/go";
import { GoMoon } from "react-icons/go";
import './Darkmode.css'
function Darkmode() {
    const [mode, setMode] = useState("darkmode")
    useEffect(()=>{
        document.body.className = mode
    },[mode])
  return (
    <button className = 'darkmode-button' onClick={()=>{
        if(mode==="darkmode"){
            setMode("lightmode")
        }else{
            setMode("darkmode")
        }
    }}><GoSun/></button>
  )
}

export default Darkmode