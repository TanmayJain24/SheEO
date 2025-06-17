import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";
// deepseek
import reelRoute from "./routes/reel.route.js";

import courseRoute from "./routes/course.route.js"; // Add this line

import chatbotRoutes from "./routes/chatbotRoutes.js"; // Add this line

// In your server.js or app.js
// Add this with your other route imports
import feedRoute from './routes/feed.route.js';



 
dotenv.config();


const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));

// yha pr apni api ayengi
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

// deepseek
app.use("/api/v1/reel", reelRoute);

app.use("/api/v1/courses", courseRoute); // Add this line for courses

app.use('/api/v1/chatbot', chatbotRoutes);

app.use('/api/feed', feedRoute);


// Static files and frontend routing
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})


app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})


server.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});