var bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const employeModel = new mongoose.Schema(
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
        organizationname: {
            type: String,
            required : [true, "organization is required"],
            minLength: [4,"organization should be atleast 4 character long"]
        },
        organizationlogo: {
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

    },
    {timestamps : true}
);


employeModel.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }


    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});    //this will run before save.

employeModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


employeModel.methods.getjwttoken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const Employe = mongoose.model("employe", employeModel);

module.exports = Employe;



//------------------------------------Internship---------------------------
