import express from "express";
import { Authorization } from "../middleWare/AuthorizatonMiddleWare/AuthMiddleWare.js";
import { checkStaffMiddleWare } from "../middleWare/AuthorizatonMiddleWare/checkStaffMiddleWare.js";
import { getAllUserAvaible, SendReversationStaff } from "../Controller/StaffControlller.js";
export const StaffRouter=express.Router();
StaffRouter.get("/getAllStaffAvaible",Authorization,getAllUserAvaible);
StaffRouter.post("/sendStaffReversation",Authorization,checkStaffMiddleWare,SendReversationStaff);

