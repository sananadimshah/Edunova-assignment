import bookModel from "../Model/bookModel.js";
import userModel from "../Model/userModel.js";
import transactionModel from "../Model/transactionModel.js";
import { mongoose } from "mongoose";
import { isValid } from "../validator/validator.js";
const isValidId = mongoose.Types.ObjectId.isValid;

const bookIssue = async (req, res) => {
  try {
    const { bookname, userId, issueDate } = req.body;
    const reqBody = ["bookname", "userId", "issueDate"];

    for (let element of reqBody) {
      if (!isValid(req.body[element]))
        return res.status(400).send({
          status: false,
          msg: `This filed is required ${element} and must be in valid format`,
        });
    }

    if (!isValidId(userId)) {
      return res.status(400).send({
        status: false,
        msg: "Invalid userId",
      });
    }
    const bookExists = await bookModel.findOne({ bookname });
    if (!bookExists) {
      return res.status(404).send({
        status: false,
        msg: "Book not found",
      });
    }
    const userExists = await userModel.findById(userId);
    if (!userExists) {
      return res.status(404).send({
        status: false,
        msg: "User not found. Please sign up",
      });
    }

    const bookIssue = await transactionModel.create({
      bookname,
      userId,
      issueDate,
    });
    return res.status(201).send({
      status: true,
      msg: "Successfully book issued",
      data: bookIssue,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const bookReturn = async (res, req) => {
  try {
    const { bookname, userId, returnDate } = req.body;
    const reqBody = ["bookname", "userId", "returnDate"];

    for (let element of reqBody) {
      if (!isValid(req.body[element]))
        return res.status(400).send({
          status: false,
          msg: `This filed is required ${element} and must be in valid format`,
        });
    }

    if (!isValidId(userId)) {
      return res.status(400).send({
        status: false,
        msg: "Invalid userId",
      });
    }
    const isBookIssued = await transactionModel.findOne({
      bookname,
      userId,
      status: "issued",
    });
    if (!isBookIssued) {
      return res.status(404).send({
        status: false,
        msg: "Sorry,The book is not found or book is not issued ",
      });
    }
    // find book for get rentPerDay
    const findBook = await bookModel.findOne({ bookname });

    // To get value of issued
    const issueDate = isBookIssued.issueDate;
    const returnBook = new Date(returnDate);
    const rentPerDay = findBook.rentPerDay;
    // to calculate the rent
    const differenceInTime = returnBook.getTime() - issueDate.getTime();
    const differenceInDays = Math.ceil(
      differenceInTime / (1000 * 60 * 60 * 24)
    );
    // total rent
    const totalRent = differenceInDays * rentPerDay;
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
export { bookIssue, bookReturn };
