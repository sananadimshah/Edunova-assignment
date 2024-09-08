import express from "express";
const router = express.Router();
import { addTask, getTask, updateTask } from "./Controller/addController.js";

router.post("/add", addTask);

router.get("/get", getTask);

router.put("/update/:id", updateTask);

export default router;
