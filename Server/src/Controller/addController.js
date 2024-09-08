import TodoModel from "../Model/TodoModel.js";

const addTask = async (req, res) => {
  try {
    const task = req.body.task;
    if (!task) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide Task" });
    }
    const createTask = await TodoModel.create({ task });
    return res.status(201).send({
      status: true,
      data: createTask,
      msg: "Task Succesfully created",
    });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.msg });
  }
};

const getTask = async (req, res) => {
  try {
    const getTasks = await TodoModel.find();
    if (!getTasks) {
      return res.status(400).send({ status: false, msg: "Task not found" });
    }
    return res
      .status(200)
      .send({ status: true, msg: "Task found", task: getTasks });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.msg });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { done: true },
      {
        new: true,
      }
    );
    if (!updatedTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }
    res.status(200).send(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};
// const updateTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(id);
//     const updatedTask = await TodoModel.findByIdAndUpdate(
//       { id: id },
//       { done: true }
//     );
//     if (!updatedTask) {
//       return res.status(404).send({
//         status: true,
//         msg: "Data Updated ",
//         data: "Record not found ",
//       });
//     }
//     console.log(updatedTask);
//     return res
//       .status(201)
//       .send({ status: true, msg: "Data Updated ", data: updatedTask });
//   } catch (error) {
//     return res.status(500).send({ status: false, msg: error.msg });
//   }
// };
export { addTask, getTask, updateTask };
