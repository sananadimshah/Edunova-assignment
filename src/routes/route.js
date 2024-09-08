import express from "express";
const router = express.Router();
import { createUser, allUsers } from "../Controller/UserController.js";
import {
  createBook,
  getBooksByQuery,
  allBooks,
  getBooksStatus,
} from "../Controller/bookController.js";
import { bookIssue, bookReturn } from "../Controller/trancationsController.js";

// User api
router.post("/createUser", createUser);

router.get("/allUsers", allUsers);

// Book api
router.post("/createBook", createBook);

router.get("/allBooks", allBooks);

router.get("/getBooks", getBooksByQuery);

router.get("/getBooksStatus/:bookname", getBooksStatus);

// Transaction api

router.post("/transaction/issue", bookIssue);

router.put("/transaction/return", bookReturn);

export default router;
