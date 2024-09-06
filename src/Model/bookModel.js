import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema(
  {
    bookname: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    rentPerDay: {
      type: Number,
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
const bookModel = mongoose.model("book", bookSchema);

export default bookModel;
