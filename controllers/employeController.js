const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employe = require("../models/employeModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/EroorHandler");
const {sendtoken} = require("../utils/SendToken");
const {sendmail} = require("../utils/nodemailer");
const imagekit =require("../utils/imagekit").initImagekit();
const path = require("path")



exports.homepage = catchAsyncErrors(async(req,res,next) => {
    res.json({message: "secure employe Homepage!"});
});

exports.currentEmploye = catchAsyncErrors(async(req,res,next) => {
    const employe = await Employe.findById(req.id).exec();
    res.json({employe});
});

exports.employesignup = catchAsyncErrors(async(req,res,next) => {
    const employe = await new Employe(req.body).save();
    // res.status(201).json(student);
    sendtoken(employe,201,res);
});

exports.employesignin = catchAsyncErrors(async(req,res,next) => {
    const employe = await Employe.findOne({email: req.body.email})
    .select("+password")
    .exec();

    if(!employe) return next(new ErrorHandler("user not found with this email address",404));

    const isMatch = employe.comparepassword(req.body.password);
    if(!isMatch) return next(new ErrorHandler("Wrong credientials", 500));

    // res.json(employe);
    sendtoken(employe,200,res);
});

exports.employesignout = catchAsyncErrors(async(req,res,next) => {
    res.clearCookie("token");
    res.json({message: 'successfully signout'});
});

exports.employesendmail = catchAsyncErrors(async(req,res,next) => {
    const employe = await Employe.findOne({email: req.body.email}).exec();
    if(!employe) return next(new ErrorHandler("user not found with this email address",404));

    const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`;

    sendmail(req,res,next);
    employe.resetPasswordToken = "1";
    await employe.save();
    res.json({employe,url});

});


exports.employeforgetlink = catchAsyncErrors(async(req,res,next) => {
    const employe = await Employe.findById(req.params.id).exec();
    if(!employe) return next(new ErrorHandler("user not found with this email address",404));

    if(employe.resetPasswordToken == "1"){
        employe.resetPasswordToken = "0"
        employe.password = req.body.password;
        await employe.save();
    }else{
        return next(new ErrorHandler("Invalid reset password link!please try again",404));  
    }
    res.status(200).json({
        message: "password has been succeessfully changed!",
    });

});

exports.employeresetpassword = catchAsyncErrors(async(req,res,next) => {
        const employe = await Employe.findById(req.id).exec();
        employe.password = req.body.password;
        await employe.save();
        sendtoken(employe, 201,res);
});

exports.employeupdate = catchAsyncErrors(async(req,res,next) => {
    const employe = await Employe.findByIdAndUpdate(req.params.id,req.body).exec();

    res.status(201).json({
        success: true,
        message:"employe update succeessfully!",
        employe,
    });
    
});

exports.employeavatar = catchAsyncErrors(async(req,res,next) => {
    const employe = await Employe.findById(req.params.id).exec();
    const file = req.files.organizationlogo;
    const modifiedName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;
    
    if(employe.organizationlogo.fileId !== ""){
        await imagekit.deleteFile(employe.organizationlogo.fileId);
    }

    const {fileId, url} = await imagekit.upload({
        file: file.data,
        fileName:modifiedFileName,
    });

    employe.organizationlogo = {fileId,url};
    await employe.save();

   res.status(200).json({
        success: true,
        message:"Profile updatatyed succeessfully!",
    });
    
});


//-----------------------internship-----------------------------------

exports.createinternship = catchAsyncErrors(async(req,res,next) => {
    const employe = await Employe.findById(req.id).exec();
    const internship = await new Internship(req.body);
    internship.employe = employe._id;
    employe.internships.push(internship._id);
    await internship.save();
    await employe.save();
    res.status(201).json({ success: true, internship}); 
});

exports.readinternship = catchAsyncErrors(async(req,res,next) => {
    const {internships} = await Employe.findById(req.id).populate("internship").exec();
    res.status(200).json({ success: true, internships}); 
});

exports.readsingleinternship = catchAsyncErrors(async(req,res,next) => {
    const internships = await new Internship.findById(req.params.id).exec();
    res.status(200).json({ success: true, internships}); 
});


//-----------------------jobs-----------------------------------

exports.createjobs = catchAsyncErrors(async(req,res,next) => {
    const employe = await Employe.findById(req.id).exec();
    const jobs = await new Job(req.body);
    jobs.employe = employe._id;
    employe.jobs.push(jobs._id);
    await jobs.save();
    await employe.save();
    res.status(201).json({ success: true, jobs}); 
});

exports.readjobs = catchAsyncErrors(async(req,res,next) => {
    const {jobs} = await Employe.findById(req.id).populate("jobs").exec();
    res.status(200).json({ success: true, jobs}); 
});

exports.readsinglejobs = catchAsyncErrors(async(req,res,next) => {
    const jobs = await new Job.findById(req.params.id).exec();
    res.status(200).json({ success: true, jobs}); 
});









