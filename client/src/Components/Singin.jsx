import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Signin.module.css";

function Singin() {
  const navigate = useNavigate();
  const loginuser = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formValues = Object.fromEntries(form.entries());
    try {
      const result = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
      if (result.ok) {
        navigate("/");
        localStorage.setItem("login", true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const user = {
      email: form.get("email"),
      password: form.get("password"),
      question: form.get("question"),
    };
    try {
      const result = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("good");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className={styles.sings}>
        <div className={styles.signin}>
          <h1>Sign</h1>
          <form onSubmit={(e) => loginuser(e)} className="form">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className={styles.myinp} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className={styles.myinp} />
            <input type="submit" className={styles.submitbutton} />
          </form>
          <Link to="/forgot" className={styles.liiik}>
            Forgot
          </Link>
        </div>
        <div className={styles.signin}>
          <h1>Sign Up</h1>
          <form onSubmit={(e) => signup(e)} className="form">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className={styles.myinp} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className={styles.myinp} />
            <label htmlFor="question" style={{ textAlign: "center" }}>
              Your Name with Age <br />
              (without space)
            </label>
            <input type="text" name="question" className={styles.myinp} />
            <input type="submit" className={styles.submitbutton} />
          </form>
        </div>
      </div>
    </>
  );
}

export default Singin;
