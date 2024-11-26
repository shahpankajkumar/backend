const express = require("express");
const  cors = require("cors");
const mongoDB = require("./config/db");
mongoDB();
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", require("./routes/User"));

app.get("/",(req, res)=> {
    res.status(200).send("Welcome")
})


app.listen(process.env.PORT, ()=> {
    console.log(`server is running ${process.env.PORT}`);
})