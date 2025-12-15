import { GuestReversation } from "../models/GuestReversationModel.js";
import { User } from "../models/UserModel.js";
import { sendEmailForPhotographer } from "../utils/assignPhotographerEmail.js";

//for guest
export async function reservephotoshoot(req, res) {
  const { fullName, companyName, shotLocation, phoneNumber, note, date } =req.body;
  try {
    const newOne = {
      fullName,
      companyName,
      shotLocation,
      phoneNumber,
      note,
      date,
    };
    let newReservePhotoshoot = await GuestReversation.create(newOne);

    return res.status(201).send(newReservePhotoshoot);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

//for admin
export async function getAllReservePhotoshoot(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const reservephotoshoots = await GuestReversation.find().skip((page - 1) * limit).sort({ createdAt: -1 }).populate("staff","_id fullName");
    if (reservephotoshoot.length == 0) {
      return res.status(404).send({ error: "no reservephotoshoot" });
    }
    return res.status(201).send({reservephotoshoots});
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

//for admin
export async function assignphotographer(req, res) {
  const { id: staffId } = req.body; // from getavaiable staff api
  const { receiveId } = req.params; // GuestReversations
  const { id: adminId } = req.user; //admin
  try {
    //to get info about user
    const admin = await User.findById(adminId);
    const staff = await User.findById(staffId);

    console.log(receiveId);

    // update the guestReversation
    const updateRecivePhotoShoot = await GuestReversation.findByIdAndUpdate(
      receiveId,
      { $set: { staff: staffId, status: "assigned" } },
      { new: true }
    ).populate("staff","_id fullName");
    if (!updateRecivePhotoShoot) {
      return res.status(404).send({ error: "recive not found" });
    }

    //send email to photographer
    let isSend = await sendEmailForPhotographer(
      admin.email,
      staff.email,
      staff.fullName,
      updateRecivePhotoShoot.date,
      updateRecivePhotoShoot.shotLocation,
      updateRecivePhotoShoot.fullName,
      updateRecivePhotoShoot.companyName,
      updateRecivePhotoShoot.phoneNumber,
      updateRecivePhotoShoot.note
    );
    

    if (!isSend) {
      return res.status(400).send({ error: "email not send" });
    }

    //return the updateReciverphotoshoot
    return res.status(201).send({ updateRecivePhotoShoot });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

//for admin
export async function updateStatus(req, res) {
  let { status } = req.body;
  const { receiveId } = req.params; // GuestReversations
  try {
    //check then update
    const updateguestreversation = await GuestReversation.findByIdAndUpdate(
      receiveId,
      { $set: { status } },
      { new: true }
    );

    if (!updateguestreversation) {
      return res.status(404).send({ error: "GuestReversation not found" });
    }
    //return as respone
    return res.status(201).send({ updateguestreversation });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

// for staff
export async function getAllReservePhotoshootForStaff(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const {id:staffId}=req.user;

  try {
    //get all GuestReversation for staff
    const reservephotoshoots = await GuestReversation.find({staff:staffId}).skip((page - 1) * limit).limit(limit);

    //check if exist
    if (reservephotoshoot.length == 0) {
      return res.status(404).send({ error: "no reservephotoshoot" });
    }

    // return data as respone
    return res.status(201).send({reservephotoshoots});
  } catch (error) {

    return res.status(500).send({ error: error.message });
  }
}
