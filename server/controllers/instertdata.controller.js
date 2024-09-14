import express from "express";
import cookieParser from "cookie-parser";
import con from "../db/connection.js"
const app = express();
app.use(cookieParser());

  export const insertdata = async(req, res) => {
    let data = await req.user;
    let postdata = await req.body;
    var sql = `
    select * from users
    where name = ?
    `
    con.query(sql,[data.email], function (err, mydata) {
      if (err) {
        console.log(err); 
      }
      let userid = mydata[0].id
      var sql1 = `INSERT INTO todos (title, date, user_id) VALUES ('${postdata.title}', '${postdata.date}','${userid}')`;
    
      con.query(sql1, function (err, result) {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).send("Failed to insert data.");
        }
        console.log("1 record inserted");
        res.status(201).send("Data inserted successfully");
      });
    })
  }

export const getdata = async(req, res) => {
    let data = await req.user;
    console.log(data);
    var sql = `
    select * from users
    where name = ?
    `
    con.query(sql,[data.email], function (err, mydata) {
      if (err) {
        console.log(err); 
      }
      var sql1 = 
  `select * from todos
   where user_id = ?
  `;
  con.query(sql1, [mydata[0].id], function(err, result) {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Failed to insert data.");
    }
    res.status(201).send(result);
  });
    })
}

export const deletedata = async(req, res) =>{
  const data = req.body;
  var sql = `delete from todos where title like "${data.title}%"`;
  con.query(sql, function(err, result){
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Failed to delete data.");
    }
    console.log("1 record deleted");
    res.status(201).send("success");
  })
}