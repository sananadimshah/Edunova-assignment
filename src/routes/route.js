import express from "express";
const router = express.Router();
import { createUser } from "../Controller/UserController.js";
import { createBook, getBooks } from "../Controller/bookController.js";

router.post("/createUser", createUser);

router.post("/createBook", createBook);

router.get("/getBooks", getBooks);

export default router;
