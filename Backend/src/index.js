import { configDotenv } from "dotenv";
import connectDB from "./database/db.js";
import app from "./app.js";
configDotenv({
  path: "../env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`DataBase is connected Successfully ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error while connecting to the database ${err}`);
  });
