import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../baseurl";

const TodoItem = ({ todo }) =>{
  const [title,setTitle] = useState(todo.title);
  const [desc, setDesc] = useState(todo.description);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    setTitle(todo.title);
    setDesc(todo.description);
  }, [todo]);


  const deleteTodoHandler = (title) => {
    axios
      .delete(`${BASE_URL}todo/${title}`)
      .then((res) => {
        console.log(res.data);
        setTitle('');
        setDesc('');
      })
      .catch((err) => console.log(err));
  };

  const updateTodo = (titleUpdated, desUpdated) => {
    axios
      .put(`${BASE_URL}todo/${titleUpdated}`, {
        "title": titleUpdated,
        "description": desUpdated,
      })
      .then((res) => {
        setIsUpdated(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {title ? (
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
          {isUpdated ? (
            <div className="mb-4 w-80 rounded">
              <input
                type="text"
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-md px-3 py-2 w-full mb-2 w-80 "
              />
              <textarea
                type="text"
                defaultValue={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="border rounded-md px-3 py-2 w-full mb-2"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => updateTodo(title, desc)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Update Description
                </button>
                <button
                  onClick={() => setIsUpdated(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
              <hr className="my-2" />
            </div>
          ) : (
            <div>
              <p className="text-xl font-bold mb-2 text-blue-600">{title}</p>
              <p className="mb-2">{desc}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => deleteTodoHandler(title)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsUpdated(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default TodoItem;