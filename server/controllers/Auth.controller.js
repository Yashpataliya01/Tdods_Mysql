import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import con from "../db/connection.js";

const app = express();
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || "yash"; 

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const sql = 'SELECT * FROM Users WHERE name = ?';

    con.query(sql, [email], async function (err, result) {
      if (err) {
        console.error("Error querying data:", err);
        return res.status(500).send("Server Error");
      }
      if (result.length === 0) {
        return res.status(400).send("User not found");
      }

      const user = result[0];
      bcrypt.compare(password, user.password, function(err, result){
        if (err) {
          return res.status(400).send("Invalid credentials");
        }
        if(result){
          let token = jwt.sign({ email: email }, "yashh");
          res.cookie("token", token, { httpOnly: true });
          return res.status(200).json({ message: "Login successful" });
        }else {
          return res.status(401).json({ error: "Invalid credentials" });
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const signup = async (req, res) => {
  const { email, password, question } = req.body;
  console.log("heyy");
  try {
    const checkUserSql = 'SELECT name FROM users WHERE name = ?';

    con.query(checkUserSql, [email], async function (err, result) {
      if (err) {
        console.error("Error checking user:", err);
        return res.status(500).send("Failed to create user");
      }
      if (result.length > 0) {
        return res.status(400).send("Email already exists");
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserSql = 'INSERT INTO users (name, password, question) VALUES (?, ?, ?)';
        con.query(insertUserSql, [email, hashedPassword, question], function (err, result) {
          if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).send("Failed to create user.");
          }
          console.log("1 record inserted");
          res.status(201).send("User created successfully");
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

export const forgotpass = async (req, res) => {
  const { email, password, question } = req.body;
  
  try {
    const checkUserSql = 'SELECT * FROM users WHERE name = ? AND question = ?';
    con.query(checkUserSql, [email, question], async function (err, result) {
      if (err) {
        console.error("Error querying user:", err);
        return res.status(500).send("Server error");
      }
      if (result.length === 0) {
        return res.status(400).send("User not found or security question answer incorrect");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatePasswordSql = 'UPDATE users SET password = ? WHERE name = ? AND question = ?';
      con.query(updatePasswordSql, [hashedPassword, email, question], function (err, result) {
        if (err) {
          console.error("Error updating password:", err);
          return res.status(500).send("Failed to update password");
        }
        return res.status(200).send("Password updated successfully");
      });
    });
    
  } catch (error) {
    console.error("Error processing forgot password:", error);
    res.status(500).send("Internal server error");
  }
};
