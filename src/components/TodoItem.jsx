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
        <div>
          {isUpdated ? (
            <div>
              <div>
                <input type="text" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" defaultValue={desc} onChange={(e) => setDesc(e.target.value)} />
              </div>
              <div>
                <button
                  onClick={() => updateTodo(title, desc)}
                >
                  Complete
                </button>
              </div>
              <hr />
            </div>
          ) : (
            <div>
              <p>
                {title} :
              </p>
              {desc}
              <button
                onClick={() => deleteTodoHandler(title)}
              >
                Delete
              </button>
              <button
                onClick={() => setIsUpdated(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

export default TodoItem;
