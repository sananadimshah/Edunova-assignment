import { useState } from "react";
import axios from "axios";

const Create = () => {
  const [task, setTask] = useState("");
  const handleAdd = () => {
    axios.post("http://localhost:3000/add", { task });
    console
      .log(task)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    setTask(" ");
  };

  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default Create;
