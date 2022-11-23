const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("./route/users");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, function () {
        console.log("Database connected");
    });


app.use(express.json());    // activate body parser
app.use(cors());            // 

app.use('/users', userRouter);
app.listen(4000, () => console.log("server is up and running"));

