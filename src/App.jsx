import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import { BASE_URL } from "./baseurl";


function App() {
  const [todoArray, setTodoArray] = useState([{}]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    axios.get(BASE_URL + 'todo')
      .then(res => {
        setTodoArray(res.data);
        console.log('todoList', todoArray);
      })
      .catch(err => console.log(err));
  }, [title, description]);


  const addTodoHandler = () => {
    setTodoArray(
      [...todoArray,
      { 'title': title, 'description': description }]
    );
    axios.post(BASE_URL + 'todo', { 'title': title, 'description': description })
      .then((res) => {
        setTitle('');
        setDescription('');
      })
      .catch(err => console.log(err));
  };

  console.log('todo list', todoArray);

  return (
    <div>
      <h1>
        ToDo APP
      </h1>
      <div>
        <h3>
          Add your ToDo
        </h3>
        <form>
          <input value={title} onChange={event => setTitle(event.target.value)} placeholder='ToDo Title' />
          <input value={description} onChange={event => setDescription(event.target.value)} placeholder='ToDo Description' />
          <button onClick={addTodoHandler}>Add ToDo</button>
        </form>
        <h3>ToDos List</h3>
        <TodoList todoArray={todoArray} />
      </div>
    </div>
  );
}

export default App;
