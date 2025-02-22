const { GridFsStorage } = require('multer-gridfs-storage');
const {GridfsBucket} = require('mongodb');
const mongoose = require('mongoose');
const multer = require('multer');

const storage = new GridFsStorage({
    db: mongoose.connection, // Reuse existing DB connection
    file: (req, file) => {
        return { filename: file.originalname, bucketName: 'submissions' };
    },
});

const upload = multer({ storage });

module.exports = upload; // Export the multer instance
