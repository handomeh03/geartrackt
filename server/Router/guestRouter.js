import express from "express";
import { assignphotographer, getAllReservePhotoshoot, getAllReservePhotoshootForStaff, reservephotoshoot, updateStatus } from "../Controller/guestController.js";
import { photoshootSchema, photoshootValidation } from "../middleWare/JoiValidation/reservePhotoshoot.js";
import { CheckAdminMiddleware } from "../middleWare/AuthorizatonMiddleWare/CheckAdminMiddleWare.js";
import { checkStaffMiddleWare } from "../middleWare/AuthorizatonMiddleWare/checkStaffMiddleWare.js";
import { Authorization } from "../middleWare/AuthorizatonMiddleWare/AuthMiddleWare.js";
export const guestRouter=express.Router();

guestRouter.post("/reservephotoshoot",photoshootValidation(photoshootSchema),reservephotoshoot);
guestRouter.get("/getAllReservePhotoshoot",Authorization,CheckAdminMiddleware,getAllReservePhotoshoot);
guestRouter.patch("/assignphotographer/:receiveId",Authorization,CheckAdminMiddleware,assignphotographer);
guestRouter.patch("/updateStatus/:receiveId",Authorization,CheckAdminMiddleware,updateStatus);
guestRouter.get("/getAllReservePhotoshootForStaff",Authorization,checkStaffMiddleWare,getAllReservePhotoshootForStaff);