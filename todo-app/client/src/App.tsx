import React, { useEffect, useState } from 'react';
import './App.css';
import { TodoModel } from './models/TodoModel';
import axios from 'axios';
import todoIcon from './assets/direct-hit.png'
import doingIcon from './assets/glowing-star.png'
import doneIcon from './assets/check-mark-button.png'
import TodoCard from './components/TodoCard';
import Header from './components/Header';
import TaskColumn from './components/TaskColumn';

function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get<TodoModel[]>("/api/todos");
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos", error);
      }
    };

    getTodos();
  }, []);

  return (
    <>
      <div className='mx-auto'>
        <Header />
        <main className='flex justify-evenly py-5 px-[8%]'>
          <TaskColumn heading="To Do" icon={todoIcon} />
          <TaskColumn heading="Doing" icon={doingIcon} />
          <TaskColumn heading="Done" icon={doneIcon} />
        </main>
      </div>

      <div>
        {todos.map((todo) => (
          <TodoCard todos={todo} key={todo._id} />
        ))}
      </div>
    </>
  );
}

export default App;
