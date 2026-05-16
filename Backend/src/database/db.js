import mongoose from "mongoose";
import { DB_NAME } from "../constant";

const connectDB = async () => {
  try {
    const connectioninstance = await mongoose.connect(
      process.env.DATABASE_URL / DB_NAME,
    );
    console.log(
      `the DataBase is running on ${connectioninstance.connection.host}`,
    );
  } catch (error) {
    console.log(`The is a error while connecting to the datbase ${error}`);
  }
};

export default connectDB;
