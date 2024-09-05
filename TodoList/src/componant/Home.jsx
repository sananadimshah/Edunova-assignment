import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import "../componant/Todo.css";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/get")
      .then((result) => {
        setTodos(result.data.task);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    const updatedData = {
      // Include the fields you want to update here
      task: "Updated Task",
      // Add more fields if necessary
    };

    axios
      .put("http://localhost:3000/update/" + id, updatedData)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err.response.data)); // Log more detailed error information
  };

  // const handleEdit = (id) => {
  //   axios
  //     .put("http://localhost:3000/update/" + id)
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div>
      <h2>Todo List</h2>
      <Create />

      {todos.length === 0 ? (
        <div>
          <h2>No Todo Exist</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="todo-container">
            <div className="todo-content" onClick={() => handleEdit(todo._id)}>
              <i className="ri-task-fill"></i>
              <p>{todo.task}</p>
            </div>
            <div className="todo-delete">
              <i className="ri-delete-bin-line"></i>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
