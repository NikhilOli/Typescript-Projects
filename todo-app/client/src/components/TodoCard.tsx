import { TodoModel } from "../models/TodoModel";


interface TodoProp{
    todos: TodoModel
}

const TodoCard: React.FC<TodoProp> = ({ todos }) => {
    const { todo, createdAt, updatedAt } = todos;
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg my-4 p-4 bg-white">
            <h2 className="text-xl font-bold mb-2">{todo}</h2>
            <p className="text-gray-700 text-base">
            Created at: {new Date(createdAt).toLocaleString()}
            </p>
            <p className="text-gray-700 text-base">
            Updated at: {new Date(updatedAt).toLocaleString()}
            </p>
        </div>
        )
}

export default TodoCard
