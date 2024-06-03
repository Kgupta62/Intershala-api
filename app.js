require("dotenv").config({path: './.env'})
const express = require("express");
const app = express();


// db connection
require("./models/database").connectDatabase();

//logger(to know which route is hit in console)
app.use(require('cors')({origin: true, credentials : true}))
const logger = require("morgan");
app.use(logger("tiny"));

//bodyparser (used for post route)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
    session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(cookieparser());

//express file-upload
const fileupload = require("express-fileupload");
app.use(fileupload());

//routes
app.use("/user",require("./routes/indexRoutes"));
app.use("/user/resume",require("./routes/resumeRoutes"));
app.use("/employe",require("./routes/employeRoutes"));


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