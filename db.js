require('dotenv').config();


const mongoUri = process.env.MONGO_URI;
const mongoose = require('mongoose');
const { json } = require('stream/consumers');
const { object, date, string } = require('zod');
mongoose.connect(mongoUri)
    .then( ()=>{
        console.log("Database connected succesfully");
    } )

    .catch((err)=>{
        console.log(err);
    })

    


    //User: Role,FirstName,LastName,Email,Password,MobileNumber,IpAddress,Key,QrCode,Classes

    const UserSchema = new mongoose.Schema({
        role:{
            type:String,
            required:true
        },
       
        firstName:{
            type:String,
            required:true,
            },
        lastName:{
            type:String,
            required:true
            },
        
        email:{
            type:String,
            required:true,
            unique:true
        },

        password:{
            type:String,
            required:true
        },
        mobileNumber:{
            type:Number,
            required:true,
            unique:true
        },
        ipAddress:{
            type:String,
            required:true
        },

        QrCode:[{
            type:String
        }],
        key:[{
            type:String
        }],
        classes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Class"
        }],
        AttendanceID:[{
             type:mongoose.Schema.Types.ObjectId,
            ref:"Attendance"
        }],
        AnnouncementsId:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Announcement",
        }]

            //More to be continued
    })
    const User = mongoose.model("User",UserSchema);


    // Schema for a single class
    const ClassSchema = new mongoose.Schema({
        name:{ type: String , required:true },

        members:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }],
        creatorIp:{
            type:String,
            required:true
        },
        attendanceSheetId:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"SingleAttendance"
        }],
        studentPassword:{
            type:String,
            required:true
        },
        profPassword:{
            type:String,
            required:true
        }

    });
    const Class = mongoose.model("Class", ClassSchema);


    // Schema for datbases containing all classes
    const ClassesDatabaseSchema = new mongoose.Schema({
        classIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }] // References to Class documents
    });
    const ClassesDatabase = mongoose.model("Database", ClassesDatabaseSchema);


    // Schema for attendance sheet for class
    const SingleAttendanceSchema = new mongoose.Schema({
        student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            unique:true,
        },
        attendanceGrant:{
            type:Boolean,
            required:true
        }
        
    })
const SingleAttendance = mongoose.model("SingleAttendance",SingleAttendanceSchema);



    const AnnouncementSchema = new mongoose.Schema({
        creator:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        classId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Class"
        },
        content:{
            title:{
                type:String,
                required:true
            },
            announcement:{
                type:String,
                required:true
            }
        }
    })

    const Announcement = mongoose.model("Announcement",AnnouncementSchema);


    // Assignments Schema for professor

    const AssignmentSchema = new mongoose.Schema({
        creatorId : {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        classId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Class",
            required:true
        },
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        submission:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Submission",
        }],
        status:{
            type:Boolean,
            default:false,
            required:true
        },
        timestamp:{
            type:Date,
            default: () =>Date.now(),
            required:true
        }
    });

    const Assignment = mongoose.model("Assignment",AssignmentSchema);

    const SubmissionSchema = new mongoose.Schema({
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: Boolean,
            default: false,
            required: true
        },
        profComment: {
            type: String
        },
        fileData: {
            fileName: { type: String, required: true }, // Original file name
            contentType: { type: String, required: true }, // MIME type
            data: { type: Buffer, required: true } // Binary file data
        },
        timestamp: {
            type: Date,
            default: () => Date.now(),
            required: true
        }
    });
    

    const Submission = mongoose.model("Submission",SubmissionSchema);


    module.exports = { Assignment, User,Class ,SingleAttendance,ClassesDatabase,Announcement}