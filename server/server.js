import mysql from "mysql";
import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dataRoute from "./routes/data.route.js";
import authRoute from "./routes/Auth.route.js";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(3001)

app.use("/api/data", dataRoute)
app.use("/api/auth", authRoute)