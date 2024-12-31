const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();

const mongooseConnectionString = process.env.String;

//routes
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require('./routes/admin');

app.use(express.json());

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);

async function main() {
    await mongoose.connect(mongooseConnectionString);
    app.listen(3000);
}

main();