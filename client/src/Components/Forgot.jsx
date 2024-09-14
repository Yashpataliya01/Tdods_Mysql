import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Forgot.module.css";

function Forgot() {
  const navigate = useNavigate();
  const forgotpass = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const user = {
      email: form.get("email"),
      question: form.get("question"),
      password: form.get("password"),
    };
    try {
      const result = await fetch("http://localhost:3001/api/auth/forgotpass", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className={styles.sings}>
        <form onSubmit={(e) => forgotpass(e)} className="form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            style={{
              borderRadius: "10px",
              backgroundColor: "transparent",
              color: "black",
              border: "1px solid black",
              height: "25px",
            }}
            className={styles.myinp}
          />
          <label htmlFor="question" style={{ textAlign: "center" }}>
            Your Name with Age <br />
            (without space)
          </label>
          <input
            type="text"
            name="question"
            style={{
              borderRadius: "10px",
              backgroundColor: "transparent",
              color: "black",
              border: "1px solid black",
              height: "25px",
            }}
            className={styles.myinp}
          />
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            style={{
              borderRadius: "10px",
              backgroundColor: "transparent",
              color: "black",
              border: "1px solid black",
              height: "25px",
            }}
            className={styles.myinp}
          />
          <input type="submit" className="submitbutton" />
        </form>
      </div>
    </>
  );
}

export default Forgot;
