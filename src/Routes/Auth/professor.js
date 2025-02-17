const express = require("express");
const reqtypeAttacher = require("../../middlewares/reqTypeAttacher");
const validateInput = require("../../middlewares/validateInput");
const router = express.Router();


// Controller Imports:
const SignupHandler = require("../../Controllers/AuthHandlers/SignupHandler");
const SigninHandler = require("../../Controllers/AuthHandlers/SigninHandler");
const UpdateHandler = require("../../Controllers/AuthHandlers/UpdateHandler");
const DeleteHandler = require("../../Controllers/AuthHandlers/DeleteHandler");
// Middleware Imports:
// Utility function imports:
router.use(reqtypeAttacher);


router.post("/signup",validateInput, SignupHandler );
router.get("/signin",validateInput,SigninHandler );
router.put("/update",validateInput,UpdateHandler);
router.delete("/delete", DeleteHandler);

module.exports = router;