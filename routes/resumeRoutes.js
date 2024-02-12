const express = require("express");
const router = express.Router();

const { 
    resume,
    addeducation,
    editeducation,
    deleteeducation,
    addjobs,
    editjobs,
    deletejobs,
    addinternships,
    editinternships,
    deleteinternships,
    addresponsibility,
    editresponsibility,
    deleteresponsibility,
    addcourses,
    editcourses,
    deletecourses,
    addprojects,
    editprojects,
    deleteprojects,
    addskills,
    editskills,
    deleteskills,
    addaccomplishments,
    editaccomplishments,
    deleteaccomplishments } = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");


// GET "/"
router.get("/", isAuthenticated, resume);

//POST "/add-edu"
router.post("/add-edu",isAuthenticated, addeducation);

//POST "/edit-edu/:educationid"
router.post("/edit-edu/:eduid",isAuthenticated, editeducation);

//POST "/delete-edu/:educationid"
router.post("/delete-edu/:eduid",isAuthenticated, deleteeducation);

//POST "/add-jobs"
router.post("/add-jobs",isAuthenticated, addjobs);

//POST "/edit-jobs/:jobsid"
router.post("/edit-edu/:jobsid",isAuthenticated, editjobs);

//POST "/delete-jobs/:jobsid"
router.post("/delete-jobs/:jobsid",isAuthenticated, deletejobs);

//POST "/add-internships"
router.post("/add-internships",isAuthenticated, addinternships);

//POST "/edit-internships/:internshipsid"
router.post("/edit-internships/:internshipsid",isAuthenticated, editinternships);

//POST "/delete-internships/:internshipsid"
router.post("/delete-internships/:internshipsid",isAuthenticated, deleteinternships);

//POST "/add-responsibility"
router.post("/add-responsibility",isAuthenticated, addresponsibility);

//POST "/edit-responsibility/:responsibilityid"
router.post("/edit-responsibility/:responsibilityid",isAuthenticated, editresponsibility);

//POST "/delete-edu/:responsibilityid"
router.post("/delete-responsibility/:responsibilityid",isAuthenticated, deleteresponsibility);

//POST "/add-courses"
router.post("/add-courses",isAuthenticated, addcourses);

//POST "/edit-courses/:coursesid"
router.post("/edit-courses/:coursesid",isAuthenticated, editcourses);

//POST "/delete-courses/:coursesid"
router.post("/delete-courses/:coursesid",isAuthenticated, deletecourses);

//POST "/add-edu"
router.post("/add-projects",isAuthenticated, addprojects);

//POST "/edit-projects/:projectsid"
router.post("/edit-projects/:projectsid",isAuthenticated, editprojects);

//POST "/delete-projects/:projectsid"
router.post("/delete-projects/:projectsid",isAuthenticated, deleteprojects);

//POST "/add-skills"
router.post("/add-skills",isAuthenticated, addskills);

//POST "/edit-skills/:skillsid"
router.post("/edit-skills/:skillsid",isAuthenticated, editskills);

//POST "/delete-skills/:skillsid"
router.post("/delete-skills/:skillsid",isAuthenticated, deleteskills);

//POST "/add-accom"
router.post("/add-accom",isAuthenticated, addaccomplishments);

//POST "/edit-accom/:accomplishmentsid"
router.post("/edit-accom/:accomid",isAuthenticated, editaccomplishments);

//POST "/delete-accom/:accomplishmentsid"
router.post("/delete-accom/:accomid",isAuthenticated, deleteaccomplishments);


module.exports = router;