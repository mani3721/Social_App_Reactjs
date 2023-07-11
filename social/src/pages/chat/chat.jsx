import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import LogoSearch from "../../component/LogoSearch/LogoSearch";
import { useSelector } from "react-redux";
import { userChats } from "../../Api/ChatRequest";
import Conversation from "../../component/converstion/conversation";
import {UilSetting} from '@iconscout/react-unicons'
import { Link } from "react-router-dom";
import ChatBox from "../../component/chatBox/chatBox";
import {io} from 'socket.io-client'
const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  console.log(user, "user");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [sendMessage, setSendMessage]=useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null);

  const socket=useRef()

   // Send Message to socket server
   useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  useEffect(()=>{
        socket.current=io("http://localhost:8800")
        socket.current.emit("new-user-add",user._id)
        socket.current.on('get-users', (users)=>{
          setOnlineUsers(users)
        })
  },[user])
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
        console.log(data,"data")
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

   // Get the message from socket server
   useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);

  const checkOnlineStatus=(chat)=>{
       const chatMember=chat.members.find((member)=>member!==user._id)
       const online=onlineUsers.find((user)=>user.userId===chatMember)

       return online ? true : false
  }
  return (
    <>
      <div className="Chat">
        <div className="Left-side-chat ">
          <LogoSearch />
          <div className="Chat-container">
            <h2>Chats</h2>

            <div className="Chat-list">

              {chats.map((chat) => (
                <div className=""  onClick={() => {
                  setCurrentChat(chat);
                }}>
                  <Conversation
                      data={chat}
                      currentUser={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
        <div className="navIcons">
            <Link to="../home"> 
            <img src={Home} alt="" />
            </Link>  
        
            <img src={Noti} alt="" />
            <Link to = '../chat' >
            <img src={Comment} alt="" />
            </Link>
            
            <UilSetting/>
        </div>
        </div>
        {/* chatbox */}
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
        </div>
      </div>
    </>
  );
};

export default Chat;
