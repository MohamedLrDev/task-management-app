import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tasks')
      .then(response => {
        setTaskList(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  const handleAddBtn = () => {
    if (task.trim() !== "") {
      axios.post('http://127.0.0.1:8000/api/tasks', { task_content: task })
        .then(response => {
          setTaskList([...taskList, response.data]);
          setTask("");
        })
        .catch(error => {
          console.error("There was an error adding the task!", error);
        });
    }
  };

  const handleDeleteBtn = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`)
      .then(() => {
        const updatedList = taskList.filter(item => item.id !== id);
        setTaskList(updatedList);
      })
      .catch(error => {
        console.error("There was an error deleting the task!", error);
      });
  };

  const toggleChecked = (id) => {
    const updatedTask = taskList.find(item => item.id === id);
    axios.put(`http://127.0.0.1:8000/api/tasks/${id}`, {
      ...updatedTask,
      checked: !updatedTask.checked,
    })
      .then(response => {
        console.log("Updated task:", response.data); // Log response data
        const updatedList = taskList.map(item =>
          item.id === id ? response.data : item
        );
        console.log("Updated task list:", updatedList); // Log updated task list
        setTaskList(updatedList);
      })
      .catch(error => {
        console.error("There was an error updating the task!", error);
      });
  };


  return (
    <div className="container mx-auto mt-8 max-w-md font-Poppins">
      <div className="bg-[#F5F5F5] p-6 rounded shadow">
        <div className="mb-4">
          <h1 className="text-center font-bold text-xl pb-4 text-[#0e0e13]">
            TODO APP
          </h1>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task"
            className="border p-2 w-full"
          />
        </div>
        <div className="flex items-center">
          <button
            onClick={handleAddBtn}
            className="bg-[#F99417] text-white px-4 py-2 rounded"
          >
            Add task
          </button>
        </div>
      </div>

      <div className="mt-8">
        <ul className="list-none">
          {taskList.length > 0 ? (
            taskList.map((item, index) => (
              <li
                key={index}
                className="bg-[#F5F5F5] p-4 my-2 flex justify-between items-center rounded shadow"
              >
                <button onClick={() => toggleChecked(item.id)}>
                  <span className={`${item.checked ? "text-gray-500 line-through" : ""}`}>
                    {item.task_content}
                  </span>

                </button>

                <button
                  onClick={() => handleDeleteBtn(item.id)}
                  className="text-red-500"
                >
                  Delete Task
                </button>
              </li>
            ))
          ) : (
            <li className="bg-[#F5F5F5] p-4 my-2 rounded shadow">
              Aucun task ajouté
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
