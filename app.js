require("dotenv").config({path: './.env'})
const express = require("express");
const app = express();


//logger
const logger = require("morgan");
app.use(logger("tiny"));


//routes
app.use("/",require("./routes/indexRoutes"))


//error handling
const ErrorHandler = require("./utils/EroorHandler");
const {generatedErrors} = require("./middlewares/error");

app.all("*",(req,res,next) =>{
    next(new ErrorHandler(`Requested URL NOT FOUND ${req.url}`,404));
});

app.use(generatedErrors);






app.listen(
    process.env.PORT,
    console.log(`server running on port ${process.env.PORT}`)
);