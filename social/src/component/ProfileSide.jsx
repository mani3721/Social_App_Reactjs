
import React from "react";
import FollowersCard from "./Followers/Followers";
import LogoSearch from "./LogoSearch/LogoSearch";
import ProfileCard from "./ProfileCard/ProfileCard";

import "./ProfileSide.css"

const ProfileSide=()=>{
    return (
        <div className="ProfileSide">
           <LogoSearch/>
           <ProfileCard location="homepage"/>
           <FollowersCard/>
        </div>
    )
}

export default ProfileSide