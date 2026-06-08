import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`,
    );

    console.log(
      `UPLOAD_SERVICE Database is connected to ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log(
      ` UPLOAD_SERVICE there is a error while connecting to the db and here it is ${error}`,
    );
  }
};
