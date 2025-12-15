import mongoose from "mongoose";

let connection;
export async function initdb() {
  if (connection) {
    return connection;
  }
  try {
    connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("the database is connect");
    return connection;
  } catch (error) {
    throw new Error(error);
  }
}
