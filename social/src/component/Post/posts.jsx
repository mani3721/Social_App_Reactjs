import React from "react";
import './posts.css'

// import { PostsData } from "../../Data/PostData";
import Post from "../PostList/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimelinePosts } from "../../Action/postAction";
import { useParams } from "react-router-dom";
const Posts=()=>{

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  let { posts, loading } = useSelector((state) => state.postReducer);
  // console.log(posts,"posts");
  const params=useParams()
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  
  if(!posts) return 'No Posts';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  
   return(
    <div className="Posts">
      {
        loading ? "Fetching Post..." 
        :   posts.map((post, id)=>{
          return <Post data={post} id={id}/>
      
    
      })}
    </div>
   )
}

export default Posts