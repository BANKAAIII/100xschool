const express= require("express");
const reqtypeAttacher = require("../../middlewares/reqTypeAttacher");
const validateInput = require("../../middlewares/validateInput");
const SignupHandler = require("../../Controllers/AuthHandlers/SignupHandler");
const SigninHandler = require("../../Controllers/AuthHandlers/SigninHandler");
const UpdateHandler = require("../../Controllers/AuthHandlers/UpdateHandler");
const DeleteHandler = require("../../Controllers/AuthHandlers/DeleteHandler");
const router = express.Router();

router.use(reqtypeAttacher);
router.post("/signup",validateInput,SignupHandler);
router.get("/signin",validateInput,SigninHandler );
router.put("/update",validateInput,UpdateHandler );
router.delete("/delete",DeleteHandler );

module.exports = router;

