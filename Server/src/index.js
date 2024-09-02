import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import route from "./routes.js";

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://sananadimshah50:sana@cluster1.2cylsby.mongodb.net/Todos"
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(3000, () => console.log("Server is Running"));
