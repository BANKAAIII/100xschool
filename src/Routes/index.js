const express = require("express");

const router = express.Router();

const ClassRouter = require("./Class/index");
const authRouter = require("../Routes/Auth/index");
const attendanceRouter = require("../Routes/Attendance/index");
const assignmentRouter = require("../Routes/Class/AssignmentRoutes/index");

//Class Routes
router.use("/class",ClassRouter);
router.use("/auth",authRouter);
router.use("/attendance",attendanceRouter);
router.use("/assignment",assignmentRouter);



module.exports = router;