import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleAddBtn = () => {
    if (task.trim() !== "") {
      setTaskList([...taskList, { text: task, checked: false }]);
      setTask("");
    }
  };

  const handleDeleteBtn = (index) => {
    const updatedList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedList);
  };

  const toggleChecked = (index) => {
    const updatedList = taskList.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setTaskList(updatedList);
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
                <button onClick={() => toggleChecked(index)}>
                  <span
                    className={`${item.checked ? "text-gray-500 line-through" : ""}`}
                  >
                    {item.text}
                  </span>
                </button>

                <button
                  onClick={() => handleDeleteBtn(index)}
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
  )
}

export default App
