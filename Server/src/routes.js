import express from "express";
const router = express.Router();
import { addTask } from "./Controller/addController.js";

router.post("/add", addTask);

export default router;
