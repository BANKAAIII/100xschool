const express = require("express");
const createAnnouncementHandler = require("../../../Controllers/AnnouncementHandlers/createAnnounceHandler");
const deleteAnnouncementHandler = require("../../../Controllers/AnnouncementHandlers/deleteAnnouncementHandler");
const getAllAnnouncementHandler = require("../../../Controllers/AnnouncementHandlers/getAllAnouncementHandler");
const router = express.Router();


router.post("/create",createAnnouncementHandler);
router.delete("/delete",deleteAnnouncementHandler);
router.get("/getAll",getAllAnnouncementHandler);


module.exports = router;