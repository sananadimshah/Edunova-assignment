import express from "express";
const router = express.Router();
import { createUser } from "../Controller/UserController.js";
import { createBook, getBooks } from "../Controller/bookController.js";
import { bookIssue, bookReturn } from "../Controller/trancationsController.js";

// User api
router.post("/createUser", createUser);

// Book api
router.post("/createBook", createBook);

router.get("/getBooks", getBooks);

// Transaction api

router.post("/transaction/issue", bookIssue);

router.put("/transaction/return", bookReturn);

export default router;
