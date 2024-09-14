import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../app.css";

function Home() {
  const [todos, settodos] = useState([]);
  const [login, setlogin] = useState(localStorage.getItem("login"));
  const calldata = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/data/userdata", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const userdata = await res.json();
      settodos(userdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const submitdata = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const userdata = {
      title: formdata.get("title"),
      date: formdata.get("date"),
    };
    try {
      const res = await fetch(`http://localhost:3001/api/data/postdata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userdata),
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      calldata();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    if (login) {
      calldata();
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const deletetodo = async (e) => {
    try {
      const res = await fetch("http://localhost:3001/api/data/deletedata", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      } else {
        alert("done");
        calldata();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="appcontainer">
      <Link to={"/signin"} className="loginbtn">
        Signin
      </Link>
      <h1 className="app-title">My Todo List</h1>
      <form className="todo-form" onSubmit={(e) => submitdata(e)}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="inpput"
        />
        <input type="date" name="date" className="inpput" />
        <input type="submit" value="Submit" className="submitbutton" />
      </form>
      <div className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <div key={index} className="todo-item">
              <h2 className="todo-title">{todo.title}</h2>
              <p className="todo-date">{formatDate(todo.date)}</p>
              <button
                className="delete-button"
                onClick={() => deletetodo(todo)}
              >
                <i
                  className="fa-solid fa-trash"
                  style={{ color: "#fd777c" }}
                ></i>
              </button>
            </div>
          ))
        ) : (
          <h4 style={{ textAlign: "center" }}>No data</h4>
        )}
      </div>
    </div>
  );
}

export default Home;
