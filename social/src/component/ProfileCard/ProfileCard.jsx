import React from "react";
import { useSelector } from "react-redux";
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import './ProfileCard.css'
import {Link} from 'react-router-dom'

const ProfileCard=({location})=>{

    const { user } = useSelector((state) => state.authReducer.authData);

    const posts=useSelector((state) => state.postReducer.posts);

    const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER

    const ProfilePage =false;
    return (
       <div className="ProfileCard">
        <div className="ProfileImages">
            <img src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "banner.png"} alt="" />
            <img src={user.coverPicture ? serverPublic + user.profilePicture : serverPublic + "Avatar.png"} alt="" />
        </div>
        <div className="ProfileName">
            <span>{user.firstname} {user.lastname}</span>
            <span>{user.worksAt? user.worksAt : "Write About YourSelf" }</span>
        </div>
        <div className="followStatus">
            <hr />
            <div>
            <div className="follow">
                <span>{user.following.length}</span>
                <span>Following</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
                <span>{user.followers.length}</span>
                <span>Followers</span>
            </div>
            {location==="profilePage" &&(
                <>
                <div className="vl">

                </div>

                <div className="follow">
                    <span>{posts.filter((post)=>post.userId===user._id).length}</span>
                    <span>Post</span>
                </div>
                
                </>
            )}
            </div>
            <hr />
            
        </div>
        {location==="profilePage" ? "": <span>
            <Link  to ={`/profile/${user._id}`} style={{textDecoration :"none"}} > 
            My Profile
            </Link>
           
        </span>}
       
       </div>
    )
}

export default ProfileCard