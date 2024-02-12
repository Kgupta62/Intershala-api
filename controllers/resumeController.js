const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/EroorHandler");
const {v4: uuidv4} = require('uuid');

exports.resume = catchAsyncErrors(async(req,res,next) => {
    const {resume} = await Student.findById(req.id).exec();
    res.json({message: "secure Resume page!",resume});
});

//education
exports.addeducation = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    student.education.push({...req.body, id: uuidv4() });
    await Student.save();
    res.json({message: "Education added!"});
});

exports.editeducation = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.education.findIndex(i => i.id === req.params.eduid);
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body,
    };
    await Student.save();
    res.json({message: "Education updated!"});
});

exports.deleteeducation = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.education.filter(i => i.id !== req.params.eduid);
    student.resume.education[eduIndex] = Filteredu;
    await Student.save();
    res.json({message: "Education Deleted!"});
});

//jobs
exports.addjobs = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    student.jobs.push({...req.body, id: uuidv4() });
    await Student.save();
    res.json({message: "jobs added!"});
});

exports.editjobs = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.jobs.findIndex(i => i.id === req.params.eduid);
    student.resume.jobs[eduIndex] = {
        ...student.resume.jobs[eduIndex],
        ...req.body,
    };
    await Student.save();
    res.json({message: "jobs updated!"});
});

exports.deletejobs = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.jobs.filter(i => i.id !== req.params.eduid);
    student.resume.jobs[eduIndex] = Filteredu;
    await Student.save();
    res.json({message: "jobs Deleted!"});
});

//internships
exports.addinternships = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    student.internships.push({...req.body, id: uuidv4() });
    await Student.save();
    res.json({message: "internships added!"});
});

exports.editinternships = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.internships.findIndex(i => i.id === req.params.eduid);
    student.resume.internships[eduIndex] = {
        ...student.resume.internships[eduIndex],
        ...req.body,
    };
    await Student.save();
    res.json({message: "internships updated!"});
});

exports.deleteinternships = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.internships.filter(i => i.id !== req.params.eduid);
    student.resume.internships[eduIndex] = Filteredu;
    await Student.save();
    res.json({message: "internships Deleted!"});
});

//responsibility
exports.addresponsibility = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    student.responsibility.push({...req.body, id: uuidv4() });
    await Student.save();
    res.json({message: "responsibility added!"});
});

exports.editresponsibility = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.responsibility.findIndex(i => i.id === req.params.eduid);
    student.resume.responsibility[eduIndex] = {
        ...student.resume.responsibility[eduIndex],
        ...req.body,
    };
    await Student.save();
    res.json({message: "responsibility updated!"});
});

exports.deleteresponsibility = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.responsibility.filter(i => i.id !== req.params.eduid);
    student.resume.responsibility[eduIndex] = Filteredu;
    await Student.save();
    res.json({message: "responsibility Deleted!"});
});

//courses
exports.addcourses = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    student.courses.push({...req.body, id: uuidv4() });
    await Student.save();
    res.json({message: "courses added!"});
});

exports.editcourses = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.courses.findIndex(i => i.id === req.params.eduid);
    student.resume.courses[eduIndex] = {
        ...student.resume.courses[eduIndex],
        ...req.body,
    };
    await Student.save();
    res.json({message: "courses updated!"});
});

exports.deletecourses = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.courses.filter(i => i.id !== req.params.eduid);
    student.resume.courses[eduIndex] = Filteredu;
    await Student.save();
    res.json({message: "courses Deleted!"});
});

//projects
exports.addprojects = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    student.projects.push({...req.body, id: uuidv4() });
    await Student.save();
    res.json({message: "projects added!"});
});

exports.editprojects = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.projects.findIndex(i => i.id === req.params.eduid);
    student.resume.projects[eduIndex] = {
        ...student.resume.projects[eduIndex],
        ...req.body,
    };
    await Student.save();
    res.json({message: "projects updated!"});
});

exports.deleteprojects = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.projects.filter(i => i.id !== req.params.eduid);
    student.resume.projects[eduIndex] = Filteredu;
    await Student.save();
    res.json({message: "projects Deleted!"});
});

//skills
exports.addskills = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    student.skills.push({...req.body, id: uuidv4() });
    await Student.save();
    res.json({message: "skills added!"});
});

exports.editskills = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.skills.findIndex(i => i.id === req.params.eduid);
    student.resume.skills[eduIndex] = {
        ...student.resume.skills[eduIndex],
        ...req.body,
    };
    await Student.save();
    res.json({message: "skills updated!"});
});

exports.deleteskills = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.skills.filter(i => i.id !== req.params.eduid);
    student.resume.skills[eduIndex] = Filteredu;
    await Student.save();
    res.json({message: "skills Deleted!"});
});

//accomplishments
exports.addaccomplishments = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    student.accomplishments.push({...req.body, id: uuidv4() });
    await Student.save();
    res.json({message: "accomplishments added!"});
});

exports.editaccomplishments = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.accomplishments.findIndex(i => i.id === req.params.eduid);
    student.resume.accomplishments[eduIndex] = {
        ...student.resume.accomplishments[eduIndex],
        ...req.body,
    };
    await Student.save();
    res.json({message: "accomplishments updated!"});
});

exports.deleteaccomplishments = catchAsyncErrors(async(req,res,next) => {
    const student = await Student.findById(req.id).exec();
    const Filterededu = student.accomplishments.filter(i => i.id !== req.params.eduid);
    student.resume.accomplishments[eduIndex] = Filteredu;
    await Student.save();
    res.json({message: "accomplishments Deleted!"});
});

