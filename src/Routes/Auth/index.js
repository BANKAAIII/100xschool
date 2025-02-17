const express = require("express");
const router = express.Router();

const profRouter = require("../Auth/professor");
const studentRouter = require("../Auth/student");

router.use("/professor",profRouter );
router.use("/student",studentRouter);


module.exports = router;