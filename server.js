const express =require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Import the database and the credentials in the env.
require('dotenv').config();
require("./db");

// Routers instialzation
const mainRouter = require("./src/Routes/index");


const app = express();

const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/v1",mainRouter);

app.listen(3000, ()=> {
    console.log("Server started Succesfully")
})