import React, { Fragment, useState } from "react";
const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  // edit a todo
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const todoId = todo.todo_id;
      await fetch(`http://localhost:3000/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      // fresh the window
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      {/* 
        id = id10
     */}
      <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button 
                type="button" 
                className="close" 
                data-dismiss="modal"
                onClick={() => {setDescription(todo.description)}}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={() => {setDescription(todo.description)}}
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EditTodo;
