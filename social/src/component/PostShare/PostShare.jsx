import React,{useState, useRef} from "react";
import ProfileImage from '../../img/profileImg.jpg'

import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";


import './PostShare.css'
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../Action/UploadAction";
// import { upload } from "@testing-library/user-event/dist/upload";

const PostShare=()=>{

  const loading = useSelector((state)=>state.postReducer.uploading)

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
  const desc =useRef()

    const [image, setImage]=useState(null)
    const imageRef=useRef()

    const imageChange=(e)=>{
        if(e.target.files && e.target.files[0]){
            let img=e.target.files[0];
            setImage(img)
        }
    }


    const handleSubmit=(e)=>{
      e.preventDefault()
  //  console.log("share")
      const newPost ={
        userId:user._id,
        desc:desc.current.value
      }
      // dispatch(uploadPost(newPost))

      if (image) {
        
        const data=new FormData()
        const filename= Date.now()+ image.name
        data.append('name' ,filename)
        data.append("file",image)
        newPost.image=filename
        console.log(newPost,"newPostnewPostnewPost");

        try {

          dispatch(uploadImage(data))
          
        } catch (error) {
          console.log(error)
        }
       
      }

     dispatch(uploadPost(newPost));

     reset()

    }

    const reset =()=>{
      setImage(null)
      desc.current.value=""
    }
    return (
        <div className="PostShare">
            <img src={user.coverPicture ? serverPublic + user.profilePicture : serverPublic + "Avatar.png"} alt="" />
            <div>
            <input ref={desc} type="text" placeholder="Type here" required  />
            <div className="postOptions">
            <div className="option"
              style={{color:"var(--photo)"}}
              onClick={()=>imageRef.current.click()}
              >
                <UilScenery/>
                Photo
            </div>
            <div className="option"
            style={{color:"var(--video)"}}
            >
                <UilPlayCircle/>
                Video
            </div>
            <div className="option"
              style={{color:"var(--location)"}}>
                <UilLocationPoint/>
                Location
            </div>
            <div className="option"
              style={{color:"var(--shedule)"}}>
                <UilSchedule/>
                Shedule
            </div>
            <button className="button ps-button" onClick={ handleSubmit} disabled={loading}>
              
              {loading ? "Uploading..." : "Share"}</button>
            <div style={{display:"none"}}>
                <input type="file" name="myImage" ref={imageRef} onChange={imageChange} />
            </div>
          </div>
          {image && 
          
           <div className="previewImage">

            <UilTimes onClick={()=>setImage(null)}/>
            <img src={URL.createObjectURL(image)} alt="" />
           </div>
          }
          </div>
        </div>
       
    )

}

export default PostShare