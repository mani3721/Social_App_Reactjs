import React from "react";
import PostSide from "../component/PostSide/PostSide";
import ProfileSide from "../component/ProfileSide";
import RightSide from "../component/RightSide/RightSide";
import './Home.css'
const Home=()=>{
    return (
        <div className="Home">
           <ProfileSide/>
           <PostSide/>
           <RightSide/>
        </div>
    )
}

export default Home