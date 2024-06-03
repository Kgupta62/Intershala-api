const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/EroorHandler");
const {sendtoken} = require("../utils/SendToken");
const {sendmail} = require("../utils/nodemailer");
const imagekit =require("../utils/imagekit").initImagekit();
const path = require("path")



exports.homepage = catchAsyncErrors(async(req,res,next) => {
    res.json({message: "secure Homepage!"});
});


exports.currentUser = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    res.json({student});
});

exports.studentsignup = catchAsyncErrors(async(req,res,next) => {
    const student = await new Student(req.body).save();
    // res.status(201).json(student);
    console.log(student)
    sendtoken(student,201,res);
});

exports.studentsignin = catchAsyncErrors(async(req,res,next) => {
    console.log(req.body)
    const student = await Student.findOne({email: req.body.email})
    .select("+password")
    .exec();
    console.log(student)
    if(!student) return next(new ErrorHandler("user not found with this email address",404));

    const isMatch = student.comparepassword(req.body.password);
    if(!isMatch) return next(new ErrorHandler("Wrong credientials", 500));

    // res.json(student);
    sendtoken(student,200,res);
});

exports.studentsignout = catchAsyncErrors(async(req,res,next) => {
   
    res.clearCookie("token");
    res.json({message: 'successfully signout'});

});

exports.studentsendmail = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findOne({email: req.body.email}).exec();
    if(!student) return next(new ErrorHandler("user not found with this email address",404));

    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;

    sendmail(req,res,next);
    student.resetPasswordToken = "1";
    await student.save();
    res.json({student,url});

});


exports.studentforgetlink = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.params.id).exec();
    if(!student) return next(new ErrorHandler("user not found with this email address",404));

    if(student.resetPasswordToken == "1"){
        student.resetPasswordToken = "0"
        student.password = req.body.password;
        await student.save();
    }else{
        return next(new ErrorHandler("Invalid reset password link!please try again",404));  
    }
    res.status(200).json({
        message: "password has been succeessfully changed!",
    });

});

exports.studentresetpassword = catchAsyncErrors(async(req,res,next) => {
        const student = await Student.findById(req.id).exec();
        student.password = req.body.password;
        await student.save();
        sendtoken(student, 201,res);
});

exports.studentupdate = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findByIdAndUpdate(req.params.id,req.body).exec();

    res.status(201).json({
        success: true,
        message:"Student update succeessfully!",
        student,
    });
    
});

exports.studentavatar = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.params.id).exec();
    const file = req.files.avatar;
    const modifiedName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;
    
    if(student.avatar.fileId !== ""){
        await imagekit.deleteFile(student.avatar.fileId);
    }

    const {fileId, url} = await imagekit.upload({
        file: file.data,
        fileName:modifiedFileName,
    });

    student.avatar = {fileId,url};
    await student.save();

   res.status(200).json({
        success: true,
        message:"Profile updatatyed succeessfully!",
    });
    
});

// -------------------apply internship-------------
exports.applyinternship = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const internship = await Internship.findById(req.params.internshipid).exec();

    student.internships.push(internship._id);
    internship.students.push(student._id);

    await student.save();
    await internship.save();

    res.json({student});
});

// -------------------apply job---------------
exports.applyjob = catchAsyncErrors(async(req,res,next) => {
    
    const student = await Student.findById(req.id).exec();
    const job = await Job.findById(req.params.internshipid).exec();

    student.job.push(job._id);
    job.students.push(student._id);

    await student.save();
    await job.save();
    
    res.json({student});
});








