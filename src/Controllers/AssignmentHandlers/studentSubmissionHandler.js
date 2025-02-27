const { Readable } = require("stream");
const { gridFSBucket } = require("../../../db"); // Import gridFSBucket safely

const uploadFileHandler = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const { originalname, mimetype, buffer } = req.file;

        if (!gridFSBucket) {
            return res.status(500).json({ error: "GridFSBucket not initialized" });
        }

        // Convert buffer to a readable stream
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null); // End the stream
        // Create an upload stream to GridFS
        const uploadStream = gridFSBucket.openUploadStream(originalname, {  contentType: mimetype });
        console.log(uploadStream);

        // Pipe the readable stream to MongoDB
        readableStream.pipe(uploadStream);

        uploadStream.on("finish", () => {

            if(!f?._id){
                return res.status(401).json({
                    success:false,
                    msg:"id is not defined"
                })
            }

            res.status(201).json({ message: "File uploaded successfully!", fileId: uploadStream.id });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports =  uploadFileHandler ;
