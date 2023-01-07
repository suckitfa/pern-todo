import React, { Fragment, useState, useEffect } from "react";
import EditTodo from './EditTodo'
// useEffect: make a request
const ListTodos = () => {
  // set a default value
  const [todos, setTodos] = useState([]);
  // delete a todo
  const deleteTodo = async (todoId) => {
    try {
      await fetch(`http://localhost:3000/todos/${todoId}`, {
        method: "DELETE",
      });

      // filter out the deleted todo
      setTodos(todos.filter((item) => item.todo_id !== todoId));
    } catch (error) {
      console.errro(error.message);
    }
  };
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              // make the node unique
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                    <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
