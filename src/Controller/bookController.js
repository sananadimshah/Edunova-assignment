import mongoose from "mongoose";
import bookModel from "../Model/bookModel.js";
import { isValid, isValidRent } from "../validator/validator.js";
import userModel from "../Model/userModel.js";

const isValidId = mongoose.Types.ObjectId.isValid;

const createBook = async (req, res) => {
  try {
    if (Object.keys(req.boby).length === 0) {
      return res.status(400).send({
        status: false,
        msg: "No parameter is found ,Plz provide detail",
      });
    }
    const { bookname, category, userId, rentPerDay } = req.body;
    const reqBody = ["bookname", "category", "userId"];

    for (let element of reqBody) {
      if (!isValid(req.body[element]))
        return res.status(400).send({
          status: false,
          msg: `This filed is required ${element} and must be in valid format`,
        });
    }

    if (!rentPerDay) {
      return res.status(400).send({
        status: false,
        msg: "Please fill rent filed is required",
      });
    }

    if (!isValidId(userId)) {
      return res.status(400).send({
        status: false,
        msg: "Invalid userId",
      });
    }

    if (!isValidRent(rentPerDay)) {
      return res.status(400).send({
        status: false,
        msg: "Invalid rent",
      });
    }

    const bookNameExits = await bookModel.findOne({ bookname });

    if (bookNameExits) {
      return res.status(400).send({
        status: false,
        msg: "This bookName is already Exist",
      });
    }
    const userExits = await userModel.findById(userId);
    if (!userExits) {
      return res.status(400).send({
        status: false,
        msg: "Invalid User",
      });
    }

    const createBook = await bookModel.create({
      bookname,
      category,
      userId,
      rentPerDay,
    });
    return res.status(201).send({
      status: true,
      msg: "Book detail is successfully registered",
      data: createBook,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const getBooks = async (req, res) => {
  try {
    if (Object.keys(req.query).length === 0) {
      return res.status(400).send({
        status: false,
        msg: "Please pass data to get the listOfBook",
      });
    }
    const { bookname, rentRange, category } = req.query;

    let query = {};

    if (bookname) {
      query.bookname = { $regex: String(bookname), $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (rentRange) {
      const rentPrice = rentRange.split("-");

      let minValue = Number(rentPrice[0].trim());
      let maxValue = Number(rentPrice[1].trim());

      if (rentPrice.length !== 2 || isNaN(minValue) || isNaN(maxValue)) {
        return res.status(400).send({
          status: false,
          msg: "Invalid rent price range format. Use min-max format, e.g., 100-500",
        });
      }

      query.rentPerDay = { $gte: minValue, $lte: maxValue };
    }

    const listOfBook = await bookModel.find(query);
    if (listOfBook.length === 0 || !listOfBook) {
      return res.status(404).send({
        status: false,
        msg: "Not any book found with this term",
      });
    }

    return res.status(200).send({
      status: true,
      msg: "Books found",
      data: listOfBook,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

// const createUser = async(req,res) => {
//     try {

//     } catch (error) {
//         return res.status(500).send({ status: false, msg: err.message })
//     }
// };

export { createBook, getBooks };
