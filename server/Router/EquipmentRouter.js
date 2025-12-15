import express from "express";
import { addEquipment, changeStatusItem, checkin, checkinTrip, checkout, DeleteEquipment, editEquipment, getAllEquipment, getAllReversationForOneStaff, getAllTrips, getAllTripsforOneStaff, getAvailableEquipment, GetitemOftrip, MakeTrip, searchEquipment } from "../Controller/EquipmentController.js";
import { Authorization } from "../middleWare/AuthorizatonMiddleWare/AuthMiddleWare.js";
import { CheckAdminMiddleware } from "../middleWare/AuthorizatonMiddleWare/CheckAdminMiddleWare.js";
import { addEquipmentSchema, addEquipmentValid } from "../middleWare/JoiValidation/addEquipment.js";
import { checkStaffMiddleWare } from "../middleWare/AuthorizatonMiddleWare/checkStaffMiddleWare.js";


export const EquipmentRouter=express.Router();

EquipmentRouter.post("/addEquipment",Authorization,CheckAdminMiddleware,addEquipmentValid(addEquipmentSchema),addEquipment)
EquipmentRouter.delete("/deleteEquipment/:id",Authorization,CheckAdminMiddleware,DeleteEquipment);
EquipmentRouter.get("/getAllEquipment",getAllEquipment);

EquipmentRouter.get("/getAvailableEquipment/:filter",getAvailableEquipment);

EquipmentRouter.patch("/editEquipment/:equipmentId",Authorization,CheckAdminMiddleware,editEquipment);
EquipmentRouter.get("/searchEquipment",Authorization,CheckAdminMiddleware,searchEquipment);


EquipmentRouter.post("/trip/chckout",Authorization,checkStaffMiddleWare,MakeTrip);
EquipmentRouter.get("/getAllTripForOneStaff",Authorization,checkStaffMiddleWare,getAllTripsforOneStaff);
EquipmentRouter.get("/getAllTrips",Authorization,CheckAdminMiddleware,getAllTrips);
EquipmentRouter.patch("/checkin/trip/:id",Authorization,checkStaffMiddleWare,checkinTrip);
EquipmentRouter.get("/getItemOfTrip/:id",GetitemOftrip);

EquipmentRouter.get("/getAllReversationForOneStaff",Authorization,checkStaffMiddleWare,getAllReversationForOneStaff);
EquipmentRouter.patch("/changeStatusItem/:id",changeStatusItem)