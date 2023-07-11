import React, { useState } from "react";
import {UilPen} from '@iconscout/react-unicons'
import './infoCard.css'
import ProfileModal from "../ProfileModal/ProfileModal";
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import *as UserApi from '../../Api/UserRequest'
import {useParams} from 'react-router-dom'
import { logOut } from "../../Action/AuthAction";


const InfoCard=()=>{

    

    const [modalOpened, setModalOpened] = useState(false);

    const dispatch=useDispatch()
    const params = useParams();
    
    const profileUserId=params.id

    const [profileUser, setProfileUser]=useState({})

    console.log(profileUser,"profileUser");

    const {user}=useSelector((state)=>state.authReducer.authData)

    useEffect(() => {
        const fetchProfileUser = async () => {
          if (profileUserId === user._id) {
            setProfileUser(user);
          } else {
            console.log("fetching")
            const profileUser = await UserApi.getUser(profileUserId);
            setProfileUser(profileUser);
            console.log(profileUser)
          }
        };
        fetchProfileUser();
      }, [user]);


      const handleLogOut=()=>{
        dispatch(logOut())
      }
    return (
        <div className="infoCard">
            <div className="infoHead">
                <h3>Your Info</h3>
                {user._id===profileUserId ? ( <div>
                <UilPen width="2rem" height="1.2rem"  onClick={() => setModalOpened(true)} />
                <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user}/>
                
                </div>) : ("")}
               
            </div>
            <div className="info">
                <span><b>Status </b></span>
                <span>{profileUser.relationship}</span>
            </div>
            <div className="info">
                <span><b>Lives </b></span>
                <span>{profileUser.livesIn}</span>
            </div>
            <div className="info">
                <span><b>Work </b></span>
                <span>{profileUser.worksAt}</span>
            </div>
            <button className="button logout-button" onClick={handleLogOut}> Logout</button>
        </div>
    )
}

export default InfoCard