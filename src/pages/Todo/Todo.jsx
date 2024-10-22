import { useState, useEffect, useRef } from "react";
import { fetchTodos } from "../../data/todos";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import "./Todo.css";

const initItemsPerPage = 10;
const initOnlyWaiting = false; 

function Todo() {

  const [todosRaw, setTodosRaw] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(initOnlyWaiting); 
  const [todos, setTodos] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(initItemsPerPage); 
  const [numPages, setNumPages] = useState(0);
  const [curPage, setCurPage] = useState(1); 
  const [newId, setNewId] = useState(0); 
  const [newTitle, setNewTitle] = useState(""); 

  const itemsPerPageRef = useRef();
  const onlyWaitingRef = useRef();

  useEffect(() => {
    const todos = fetchTodos();
    setTodosRaw(todos);
    
    setNewId(
      todos.reduce((prev, todo) => (prev < todo.id ? todo.id : prev), 0) + 1
    );
  }, []);

  useEffect(() => {
    if (onlyWaiting) {
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);

  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);

  useEffect(() => {
    if (numPages <= 0) setCurPage(0);
    else if (curPage === 0) setCurPage(1);
    else if (curPage > numPages) setCurPage(numPages);
  }, [numPages]);

  
  const displayedTodos = todos.slice(
    (curPage - 1) * itemsPerPage,
    curPage * itemsPerPage
  );

  function deleteClick(id) {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  }

  function waitClick(id) {
    const todoRawSelected = todosRaw.find((todo) => todo.id === id);
    todoRawSelected.completed = true;
    setTodosRaw([...todosRaw]); 
  }

  function addClick(id, title) {
    const newTodo = {
      id,
      title,
      userId: 1,
      completed: false,
    };
    setTodosRaw([...todosRaw, newTodo]);
    setNewId(newId + 1); // เพิ่ม ID ให้กับรายการถัดไป
  }

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setNewTitle(""); 
  };
  const handleShow = () => setShow(true); 

  return (
    <div className="todo-container">
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <button className="btn btn-primary">
              <span className="bi bi-plus"></span>
            </button>{" "}
            &nbsp; Add new todo
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID :</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={newId}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Title :</Form.Label>
              <Form.Control
                type="text"
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addClick(newId, newTitle); 
              handleClose();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* filters */}
      <div className="todo-filters-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked={onlyWaiting} // ทำให้ checkbox แสดงค่าปัจจุบันที่ถูกต้อง
            onChange={(e) => {
              setOnlyWaiting(e.target.checked); // เปลี่ยนค่าเมื่อ checkbox ถูกสลับ
            }}
            ref={onlyWaitingRef}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Show only &nbsp;{" "}
            <button className="btn btn-warning">
              waiting&nbsp; <span className="bi bi-clock"></span>
            </button>
          </label>
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={10}
          style={{ width: "200px" }}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value)); 
          }}
          ref={itemsPerPageRef}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>

      {/* table */}
      <table className="table table-striped todo-table">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th style={{ textAlign: "right" }}>
              Completed &nbsp;{" "}
              <button className="btn btn-primary" onClick={handleShow}>
                {" "}
                {/* เรียกใช้ฟังก์ชันเปิด Modal */}
                <span className="bi bi-plus"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedTodos.map((todo) => {
            return (
              <tr key={todo.id}>
                <td>
                  <span
                    className="badge bg-secondary"
                    style={{ width: "3rem" }}
                  >
                    {todo.id}
                  </span>
                </td>
                <td style={{ textAlign: "left" }}>{todo.title}</td>
                <td style={{ textAlign: "right" }}>
                  {todo.completed ? (
                    <span className="badge bg-success">
                      done&nbsp;
                      <span className="bi bi-check"></span>
                    </span>
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        waitClick(todo.id);
                      }}
                    >
                      waiting&nbsp;
                      <span className="bi bi-clock"></span>
                    </button>
                  )}
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteClick(todo.id);
                    }}
                  >
                    <span className="bi bi-trash"></span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* page control */}
      <div>
        <button
          className={
            "todo-space btn " +
            (curPage <= 1 ? "btn-outline-secondary" : "btn-outline-primary")
          }
          onClick={() => {
            setCurPage(1);
          }}
          disabled={curPage <= 1}
        >
          First
        </button>
        <button
          className={
            "todo-space btn " +
            (curPage <= 1 ? "btn-outline-secondary" : "btn-outline-primary")
          }
          onClick={() => curPage > 1 && setCurPage(curPage - 1)}
          disabled={curPage <= 1}
        >
          Previous
        </button>
        <span className="todo-space">
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>
        <button
          className={
            "todo-space btn " +
            (curPage >= numPages
              ? "btn-outline-secondary"
              : "btn-outline-primary")
          }
          onClick={() => curPage < numPages && setCurPage(curPage + 1)}
          disabled={curPage >= numPages}
        >
          Next
        </button>
        <button
          className={
            "todo-space btn " +
            (curPage >= numPages
              ? "btn-outline-secondary"
              : "btn-outline-primary")
          }
          onClick={() => {
            setCurPage(numPages);
          }}
          disabled={curPage >= numPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Todo;
