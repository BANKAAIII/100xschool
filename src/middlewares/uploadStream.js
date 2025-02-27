// Create a Connection form the Storage into the Ram then into the mongoDb Native storage

// Readable() will create a stream which will break the data into chunks and then send it into the Ram timingly
// then a upload Stream is created using gridFSBucket and thic injects the read data chunks directly into the Native mongodb Storage

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

console.log("exiting middleware");

module.exports = upload;
