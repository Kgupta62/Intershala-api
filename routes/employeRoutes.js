const express = require("express");
const router = express.Router();

const { homepage,
        employesignup,
        employesignin,
        employesignout, 
        currentEmploye,
        employesendmail,
        employeforgetlink,
        employeresetpassword,
        employeupdate,
        employeavatar,
        createinternship,
        readinternship,
        readsingleinternship,
        createjobs,
        readjobs,
        readsinglejobs
    } = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");


// GET "/"
router.get("/", isAuthenticated, homepage);

// POST "/employe"
router.post("/current", isAuthenticated, currentEmploye);

//POST "/signup"
router.post("/signup",employesignup);

//POST "/employe/signin"
router.post("/signin",employesignin);

//POST "/signout"
router.post("/signout",isAuthenticated ,employesignout);


//POST "/send-mail"
router.post("/send-mail",employesendmail);


// GET "/forget-link/:employeid"
router.get("/forget-link/:id", employeforgetlink);

// GET "/reset-password/:employeid"
router.post("/reset-password/:id",isAuthenticated, employeresetpassword);

//POST "/employe/update/:employeid"
router.post("/employe/update/:id",isAuthenticated ,employeupdate);

//POST "/avatar/:employeid"
router.post("/avatar/:id",isAuthenticated ,employeavatar);

//---------------------------Internship---------------------------------

//POST "/employe/internship/create"
router.post("/internship/create",isAuthenticated ,createinternship);

//POST "/employe/internship/read"
router.post("/internship/read",isAuthenticated ,readinternship);

//POST "/employe/internship/read/:id"
router.post("/internship/read/:id",isAuthenticated ,readsingleinternship);


//---------------------------jobs---------------------------------

//POST "/employe/jobs/create"
router.post("/jobs/create",isAuthenticated ,createjobs);

//POST "/employe/jobs/read"
router.post("/jobs/read",isAuthenticated ,readjobs);

//POST "/employe/jobs/read/:id"
router.post("/jobs/read/:id",isAuthenticated ,readsinglejobs);

module.exports = router;