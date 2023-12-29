import TodoItem from './TodoItem';
import React from 'react'

const TodoList = ({ todoArray }) => {
  return (
    <div>
      <ul>
        {todoArray.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </ul>
    </div>
  );
}

export default TodoList