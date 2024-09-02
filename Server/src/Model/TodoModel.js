import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    task: String,
  },
  { timestamps: true }
);
const TodoModel = mongoose.model("todos", TodoSchema);

export default TodoModel;
