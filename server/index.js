import express from "express";
import { initdb } from "./database/connection.js";
import dotenv from "dotenv";
import { userRouter } from "./Router/userRouter.js";
import { EquipmentRouter } from "./Router/EquipmentRouter.js";
import { StaffRouter } from "./Router/StaffRouter.js";
import { guestRouter } from "./Router/guestRouter.js";
import { GlobelLimit } from "./middleWare/RateLimit/GlobelRateLimit.js";
import cors from "cors";
dotenv.config();
const PORT=process.env.PORT || 8080;
const app=express();


//globel MiddleWare
app.use(express.json());
app.use(GlobelLimit);

app.use(cors({
    origin: "http://localhost:4200",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true
}));

app.use((req,res,next)=>{
  console.log(req.url);
  console.log(req.method);
  next();
 })

 //API
 app.use("/api/user",userRouter);
 app.use("/api/Equipment",EquipmentRouter);
 app.use("/api/staff",StaffRouter);
 app.use("/api/guest",guestRouter)
 


 // Connection DataBase
 initdb().then(()=>{
   app.listen(PORT,()=>{
      console.log(`the server is run at ${PORT}`)
   })
 }).catch((e)=>{
   console.log(e)
 })