import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
const Todos = () => {
  const [todoList, setTodoList] = useState(() => {
    const localData = localStorage.getItem("TodoList");
    return localData ? JSON.parse(localData) : [];
  });
  const [task, setTesk] = useState("");
  const [search, setSearch] = useState("");

  //Store data in localStorage
  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(todoList));
  }, [todoList]);

  //Search Task Feture
  const searchToDo = todoList.filter((each) =>
    each.todoname.toLowerCase().includes(search.toLowerCase()),
  );
  //Remove Task
  const handleDelete = (id) => {
    const filterList = todoList.filter((each) => each.id !== id);
    setTodoList(filterList);
    toast.success("Task Deleted Successfully.", {
      position: "top-left",
      autoClose: 2000,
      theme: "colored",
    });
  };
  //Complete Task
  const handleComplete = (id) => {
    const completeTask = todoList.map((each) => {
      if (each.id === id) {
        return { ...each, complete: !each.complete };
      }
      return each;
    });
    setTodoList(completeTask);
  };
  //Check Duplicate
  const isDuplicate = todoList.some(
    (each) => each.todoname.toLowerCase() === task.trim().toLowerCase(),
  );

  //Task Added
  const handleTodo = (e) => {
    e.preventDefault();
    if (task === "") {
      toast.error("Please Enter Task! ", {
        position: "top-left",
        autoClose: 2000,
        theme: "colored",
      });
    } else if (isDuplicate) {
      toast.error("Task is Alrady Exist...", {
        position: "top-left",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    } else {
      const newTask = {
        id: uuidv4(),
        todoname: task,
        complete: false,
      };
      setTodoList((old) => [...old, newTask]);
      setTesk("");
      toast.success("Task Add Successfully.", {
        position: "top-left",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {/* Card */}
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              {/* Heading */}
              <h2 className="text-center fw-bold mb-4">
                To<span className="text-warning">-</span>Do
                <span className="text-warning"> List</span>
              </h2>

              {/* Form */}
              <form onSubmit={handleTodo}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control rounded-start-pill"
                    placeholder="Enter your task..."
                    name="todoname"
                    value={task}
                    onChange={(e) => setTesk(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-warning rounded-end-pill fw-semibold"
                  >
                    Add
                  </button>
                </div>
              </form>
              {/* Search Task     */}
              <div className="input-group mb-4">
                <span className="input-group-text bg-white border-end-0 rounded-start-pill">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control border-start-0 rounded-end-pill"
                  placeholder="Search tasks..."
                />
              </div>
              {/* Todo List */}
              {searchToDo.length === 0 ? (
                <img src="https://static.vecteezy.com/system/resources/previews/014/814/192/non_2x/creatively-designed-flat-conceptual-icon-of-no-task-vector.jpg" 
                  alt="Task Not Found"
                  width="300px"
                  className="mx-auto d-block"
                />
                
              ) : (
                <ul className="list-group mt-4">
                  {searchToDo.map((each) => (
                    <li
                      key={each.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span className={each.complete ? "task-done" : ""}>
                        {each.todoname}
                      </span>
                      <div>
                        <button
                          className="btn btn-sm btn-outline-success me-2"
                          onClick={() => handleComplete(each.id)}
                        >
                          <i className="bi bi-check2-circle"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(each.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
