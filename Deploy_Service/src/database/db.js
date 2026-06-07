import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`,
    );

    console.log(
      `deploy_service  Database is connected to ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log(
      `there is a error while connecting to the db and here it is ${error}`,
    );
  }
};
