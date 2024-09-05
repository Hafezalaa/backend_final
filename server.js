import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorCreator } from "./ErrorHandler/error.js";
import connect2DB from "./Connection/Connect2DB.js";
import {User} from "./Models/user.model.js"
import user_router from "./Routers/user.route.js";
import post_router from "./Routers/post.route.js";










// creating the app

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser())
dotenv.config();



// Routers

app.use('/user', user_router)
app.use('/post', post_router)


  


// Error Handler

app.use((req,res,next)=>{
    next(errorCreator("Sorry, Path not found", 404))
})
app.use((err,req,res,next)=>{
    if(err){
        res.status(err.status || 500).json({msg: err.message})
    }
})


// connect to database

connect2DB()

// declaring the port

const port = process.env.PORT || 5000;
app.listen(port, console.log(`server is up on port: ${port} 🚀`));