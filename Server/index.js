import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthRoute from './Router/AuthRoute.js'
import UserRoute from './Router/UserRoute.js'
import PostRoute from './Router/PostRoute.js'
import cors from 'cors'
import UploadRoute from './Router/UploadRoute.js'
import ChatRoute from './Router/ChatRoute.js'
import MessageRoute from './Router/MessageRoute.js'

const app=express();
// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));


dotenv.config()
// Middleware
app.use(cors())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

mongoose.connect(process.env.MONGO_DB,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).
then(()=>app.listen(process.env.PORT,()=>console.log("Successss"))).catch((error) => console.log(error));



  // usage of routes
  app.use('/auth', AuthRoute)
  app.use('/user', UserRoute)
  app.use('/post', PostRoute)
  app.use('/upload', UploadRoute)
  app.use("/chat", ChatRoute)
  app.use("/message",MessageRoute)