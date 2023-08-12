require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const movieRoute=require("./routes/MovieRoute")
const bodyParser = require('body-parser');
const cors=require('cors')


mongoose
  .connect("mongodb+srv://gurpreetsingh:Shalu%401999@cluster0.apn6ahn.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });


  app.use(cors({
    origin:"http://localhost:3000"
  }))
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api",movieRoute );


app.listen(5000, () => {
    console.log("Backend server is running!");
  });