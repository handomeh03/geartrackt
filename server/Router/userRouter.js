import express from "express";
import { editStatus, getAuditLog, getMe, login, register } from "../Controller/userController.js";
import { registerSchema, registerValid } from "../middleWare/JoiValidation/registerValidation.js";
import { loginSchema, loginValid } from "../middleWare/JoiValidation/loginValidation.js";
import { Authorization } from "../middleWare/AuthorizatonMiddleWare/AuthMiddleWare.js";
import { CheckAdminMiddleware } from "../middleWare/AuthorizatonMiddleWare/CheckAdminMiddleWare.js";
import { rateLimtLogin } from "../middleWare/RateLimit/LoginRateLimit.js";

export const userRouter=express.Router();

userRouter.post("/register",registerValid(registerSchema),register);
userRouter.post("/login",rateLimtLogin,loginValid(loginSchema),login);
userRouter.get("/me",Authorization,getMe)
userRouter.get("/getAuditLog",Authorization,CheckAdminMiddleware,getAuditLog);
userRouter.patch("/editstatus",Authorization,editStatus);
