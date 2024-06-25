import { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './models/Todo'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get<Todo[]>("/api/todos")
        setTodos(res.data)
        
      } catch (error) {
        console.error("Error fetching todos", error);
      }
    }
    getTodos()
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold underline bg-green-300">
      Hello world!
    `</h1>
    <div>
      {todos.map((todo) => (
        <div key={todo._id}>
          <h2>{todo.todo}</h2>
          <p>{todo.createdAt}</p>
        </div>
      ))}
      
    </div>
    </>
  )
}

export default App
