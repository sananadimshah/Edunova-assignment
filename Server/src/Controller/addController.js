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
    console.log(error);
    return res.status(500).send({ status: false, msg: error.msg });
  }
};

export { addTask };
