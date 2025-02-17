const Student = require('../../db');
const QRCode = require('qrcode');


async function QRGenerator() {
    const QRCodes = {}; // Object to store QR codes (key: student ID, value: QR code)

    try {
        // Fetch student data from MongoDB (Only required fields)
        const studentMetaData = await Student.find({}, 'name email mobileNumber ipAddress key');

        // Loop through each student and generate QR codes
        for (const student of studentMetaData) {
            const studentData = JSON.stringify(student); // Convert student info to string
            const qrCode = await QRCode.toDataURL(studentData); // Generate QR code
            QRCodes[student._id] = qrCode; // Store QR code with student ID as key
        }

        return QRCodes; // Return the generated QR codes
    } catch (error) {
        console.error("Error generating QR codes:", error);
        return null;
    }
}

module.exports = QRGenerator;
