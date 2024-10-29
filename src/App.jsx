import React, { useEffect, useState } from "react";
import { TodoProvider } from "./context";
import TodoForms from "./components/TodoForms";
import TodoItem from "./components/TodoItem";

const App = () => {
  const [todos, setTodos] = useState([]);

  // to add new a previous datas are recorded that is in array(all data) and the new one which is in object with id and title are Added
  const addTodo = (title) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...title }]);
  };

  // to update existing single data which is in object a prev data which is in array that mean all data is mapped and a prevtodo a single object is chose and an id of that single object is compared with the to be updated data so if it matches new title is added if not nothing happens
  const updateTodo = (id, title) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? title : prevTodo))
    );
  };

  // to delete existing data which is in object again a prev which includes all data is taken. prevtodo means that single data should not be equal to the id mean all the data are displayed except that one data.
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  console.log("todos", todos);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}

            <TodoForms />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}

            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
