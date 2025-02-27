const express = require("express");
const createAssignmentHandler = require("../../../Controllers/AssignmentHandlers/createAssignmentHandler");
const  closeAssignmentHandler  = require("../../../Controllers/AssignmentHandlers/closeAssignmentHandler");
const deleteAssignmentHandler = require("../../../Controllers/AssignmentHandlers/deleteAssignmentHandler");
const upload = require("../../../../fileStorage");
const  uploadFileHandler  = require("../../../Controllers/AssignmentHandlers/studentSubmissionHandler");
const router = express.Router();

// Assignments include sending files from the user's (Students ) end and then the professor accepts or rejects it


// Create a collection dynamically with userId and column for assignment Data
// Data required for collction creation : ClassName , classId, creatorId

// Assignment : _id , creatorId , Title , materialProvided , student-assignment , timeStamp , status 
// student-Assignment : _id , studentip , Assignment , status , approval , profComment

router.post("/create",createAssignmentHandler);
router.put("/close",closeAssignmentHandler);
router.delete("/delete",deleteAssignmentHandler);
router.post("/submit",upload.single("file"),uploadFileHandler);

module.exports = router;