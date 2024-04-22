import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../src/css/style.css';


const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newTododiscription, setNewTododiscription] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('https://json-server-namh.onrender.com/todo');
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      await axios.post('https://json-server-namh.onrender.com/todo', { title: newTodo, discription: newTododiscription });
      setNewTodo('');
      setNewTododiscription('');
      const response = await axios.get('https://json-server-namh.onrender.com/todo');
      setTodos(response.data);
    }
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://json-server-namh.onrender.com/todo/${id}`);
    const response = await axios.get('https://json-server-namh.onrender.com/todo');
    setTodos(response.data);
  };

  const updateTodo = async (todo) => {
    const updatedTitle = prompt('Enter updated title:', todo.title);
    const updateddiscription = prompt('Enter updated discription:', todo.discription);
    if (updatedTitle !== null && updateddiscription !== null) {
      await axios.put(`https://json-server-namh.onrender.com/todo/${todo.id}`, { title: updatedTitle, discription: updateddiscription });
      const response = await axios.get('https://json-server-namh.onrender.com/todo');
      setTodos(response.data);
    }
  };

  



  return (
    
    
    <div>
      
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter todo title"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter todo discription"
          value={newTododiscription}
          onChange={(e) => setNewTododiscription(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>
              <strong>Title:</strong> {todo.title}
            </div>
            <div>
              <strong>discription:</strong> {todo.discription}
            </div>
            <div>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => updateTodo(todo)}>Update</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
