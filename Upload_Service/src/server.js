import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

import { connectDB } from "./database/db.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Upload_Service Server is running on port ${process.env.PORT}`,
      );
    });
  })
  .catch((err) => {
    console.log(`DATABASE CONNECTION FAILED ${err}`);
  });
