import mongoose from "mongoose";
import bookModel from "../Model/bookModel.js";
import { isValid, isValidRent } from "../validator/validator.js";
import userModel from "../Model/userModel.js";

const isValidId = mongoose.Types.ObjectId.isValid;

const createBook = async (req, res) => {
  try {
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
    const { bookname, rentRange } = req.query;

    if (rentRange) {
      const rentPrice = rentRange.split("-");

      let minValue = rentPrice[0].trim();
      let maxValue = rentPrice[1].trim();

      minValue = Number(minValue);
      maxValue = Number(maxValue);

      const rentPriceRange = await bookModel.find({
        rentPerDay: { $gte: minValue, $lte: maxValue },
      });

      if (rentPriceRange.length === 0) {
        return res.status(404).send({
          status: false,
          msg: "Not any Book found with this range",
        });
      }

      return res.status(200).send({
        status: true,
        msg: "Rent price range Books found",
        data: rentPriceRange,
      });
    }
    if (bookname) {
      const listOfBook = await bookModel.find({
        bookname: { $regex: String(bookname), $options: "i" },
      });

      if (listOfBook.length === 0) {
        return res.status(404).send({
          status: false,
          msg: "Not any Book found with this term",
        });
      }

      return res.status(200).send({
        status: true,
        msg: "Books found",
        data: listOfBook,
      });
    }
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
