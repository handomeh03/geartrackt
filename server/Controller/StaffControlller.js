import { AuditLog } from "../models/auditLog.js";
import { staffReversation } from "../models/StaffReversationModel.js";
import { User } from "../models/UserModel.js";
import { sendEmail } from "../utils/sendEmail.js";

//this for staff when he need to reversation staff
export async function getAllUserAvaible(req,res) {
  let { id: StaffId } = req.user;
  try {
    //get all user is avaible
    let users = await User.find({ status: true,role:"staff" } ,{ _id: 1, fullName: 1,email:1});
    if (users.length == 0) {
      return res.status(400).send({ error: "no user is avaible" });
    }

    //fliters users without me
    let userWithoutSelfUser = users.filter((e) => {
      return e._id != StaffId;
    });
    
    //send data as respone
    return res.status(201).send({ avaibleUser: userWithoutSelfUser });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
//send req with email
export async function SendReversationStaff(req, res) {
  const { id: senderStaffId } = req.user; // sender staff
  const { reciverStaffId, date } = req.body; // receiver staff

  if(!reciverStaffId || !date){
    return res.status(400).send({error:"please fill all input"})
  }

  try {
    // check if sender user is exist
    const senderUser = await User.findById(senderStaffId);
    if (!senderUser) {
      return res.status(400).json({ error: "sender user does not exist" });
    }
    // check if recive staff is exist
    const user = await User.findById(reciverStaffId);
    if (!user) {
      return res.status(400).json({ error: "Staff does not exist" });
    }

    // create new Staff Reversation
    const newStaffReversation = {
      date,
      senderStaffId,
      reciverStaffId,
    };

    // store reversation to recive user
    const staffReservation = await staffReversation.create(newStaffReversation);

    // send email to reciver
    const isSend = await sendEmail(
      senderUser.email,
      user.email,
      user.fullName,
      date.split("T")[0]
    );

    if (!isSend) {
      throw new Error("Email could not be sent");
    }
   await AuditLog.create({user:senderStaffId,action:"CREATE",collectionName:"staffReservation",documentId:staffReservation._id,newData:staffReservation});
    //send data as respone
    return res.status(200).json({
      staffReservation,
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
