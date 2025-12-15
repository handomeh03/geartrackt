import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/UserModel.js";
import { Equipment } from "../models/EquipmentModel.js";
import { ItemReversation } from "../models/ItemReversation.js";
import { staffReversation } from "../models/StaffReversationModel.js";
import { GuestReversation } from "../models/GuestReversationModel.js";

dotenv.config();

async function testDatabase() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to database");

  await Promise.all([
    User.deleteMany({}),
    Equipment.deleteMany({}),
    ItemReversation.deleteMany({}),
    staffReversation.deleteMany({}),
    GuestReversation.deleteMany({}),
  ]);

  const user1 = await User.create({
    fullName: "Jameel Handomeh",
    email: "jameel1@gmail.com",
    password: "12345",
    role: "admin",
  });

  const user2 = await User.create({
    fullName: "Mazen Handomeh",
    email: "mazen@gmail.com",
    password: "12345",
    role: "staff",
  });

  const equipment1 = await Equipment.create({
    code: "123456789",
    name: "camera1",
    category: "camera",
    location: "amman",
    note: "hello camera",
    purchaseDate: new Date("2025-11-03"),
    photo: "image.png",
    user: user2._id,
  });

  const itemReservation1 = await ItemReversation.create({
    startDate: new Date("2025-11-04"),
    endDate: new Date("2025-11-07"),
    equipment: equipment1._id,
    user: user2._id,
  });

  const staffReservation1 = await staffReversation.create({
    Avaiableuser: [user2._id],
    date: new Date("2025-11-05"),
  });

  const guestReservation1 = await GuestReversation.create({
    fullName: "Mazen Handomeh",
    companyName: "c1",
    shotLocation: "amman",
    phoneNumber: "0799474063",
    note: "hello mazen handomeh",
    date: new Date("2025-11-06"),
  });

  
  mongoose.connection.close();
}

testDatabase()
  .then(() => console.log("Database seeding completed"))
  .catch((e) => console.error(" Error seeding database:", e));
