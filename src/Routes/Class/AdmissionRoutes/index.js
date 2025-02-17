const express = require('express');
const tokenValidator = require('../../../middlewares/tokenValidator');
const classJoining = require('../../../Controllers/AdmissionHandlers/classJoiningHandler');

// The classroom credentials : ipAddress of creator prof , className and Studentpassword


const router = express.Router();



router.get('/classJoin',tokenValidator,classJoining);
router.delete('/exitClass',);

module.exports = router;
