import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectioninstance = await mongoose.connect(
      "mongodb://localhost:27017/Deployify",
    );

    console.log(
      `the DataBase is running on ${connectioninstance.connection.host}`,
    );
  } catch (error) {
    console.log(`The is a error while connecting to the datbase ${error}`);
  }
};

export default connectDB;
