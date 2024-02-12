var bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required : [true, "First name is required"],
            minLength: [4,"First name should be atleast 4 character long"]
        },
        lastname: {
            type: String,
            required : [true, "Last name is required"],
            minLength: [4,"Last name should be atleast 4 character long"]
        },
        
        contact: {
            type: String,
            required : [true, "contact is required"],
            minLength: [10,"contact number should be 10 charcter long only"],
            maxLength: [10,"contact number should be 10 character long only"]
        },
        city: {
            type: String,
            required : [true, "Cityname  is required"],
            minLength: [3,"City name should be atleast 3 character long"]
        },
        gender:{
            type: String,
            enum: ["Male", "Female", "Others"]
        },
        email: {
            type: String,
            required : [true, "Email is required"],
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email address is invalid'],
            unique: true,
        },
        password: {
            type: String,
            select: false,
            maxLength: [15, "password should not exceed more tahn 15 characters"],
            minLength: [6, "password should have atleast 6 characters"],
            // match: []
        },
        resetPasswordToken: {
            type: String,
            default: "0",
        },
        avatar: {
            type:Object,
            default:{
                fileId: '',
                url: "https://images.unsplash.com/photo-1702838834638-05182c3f221f?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        },
        internships :[
            {type: mongoose.Schema.Types.ObjectId , ref: 'internship' }
        ],
        jobs: [
            {type: mongoose.Schema.Types.ObjectId , ref: 'job' }
        ],
        resume: {
            education: [],
            jobs : [],
            internships: [],
            responsibility: [],
            courses: [],
            projects: [],
            skills: [],
            accomplishments: [],
        },
    },
    {timestamps : true}
);


studentModel.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }


    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});    //this will run before save.

studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


studentModel.methods.getjwttoken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const Student = mongoose.model("student", studentModel);

module.exports = Student;