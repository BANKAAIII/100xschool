// This will contain the routrer for all the classroom related routes
const express = require("express");
const router = express.Router();
const tokenValidator = require("../../middlewares/tokenValidator");
const createClass = require("../../Controllers/classroomHandlers/creation");


//Class activity Routers
const admissionRouter = require("./AdmissionRoutes/index");
const announcementRouter = require("./AnnouncementRoutes/index");
const assignmentRouter = require("./AssignmentRoutes/index");
const commentRouter = require("./CommentRoutes/index");
const deleteClass = require("../../Controllers/classroomHandlers/deletion");


// Class creation and Deletion Routes
router.post("/create",tokenValidator,createClass);
router.delete("/delete",tokenValidator,deleteClass);

//Class activity Routes
router.use("/admission",admissionRouter);
router.use("/announcement",announcementRouter);
router.use("/assignment",assignmentRouter);
router.use("/comment",commentRouter);




module.exports = router;