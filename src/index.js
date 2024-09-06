import express from "express";
import mongoose from "mongoose";

import route from "./routes/route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, () => console.log("Server is Running"));
