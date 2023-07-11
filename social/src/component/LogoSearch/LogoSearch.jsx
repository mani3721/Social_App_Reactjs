import React from "react";
import Logo from '../../img/logo.png'
import './LogoSearch.css'


const LogoSearch =()=>{
   
    return(
        <div className="LogoSearch">
           <img src={Logo} alt="" />
           <div className="Search">
            <input type="text" placeholder="#Explore" />
            <div className="s-icon">
             
            </div>
           </div>
        </div>
    )
}

export default LogoSearch