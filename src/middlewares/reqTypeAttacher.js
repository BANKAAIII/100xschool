const express = require("express");

// req. reqMetaData : requestType 
//                   role 
//                  required fields

function reqtypeAttacher(req,res,next){
    const{  method, originalUrl } = req;
    let requestType = "other";
    requiredFields=[];
    let role="";

    if(originalUrl.includes("signup") && method==="POST"){
        requestType="signup";
        requiredFields=["firstName","lastName","email","password","mobileNumber"];
        if(originalUrl.includes("professor")){role="professor"}else{role="student"};
       
        
    }else if (originalUrl.includes("signin") && method==="GET"){
        requestType="signin";
        requiredFields=["email","password","mobileNumber"];
        if(originalUrl.includes("professor")){role="professor"}else{role="student"};

    }else if(originalUrl.includes("update") && method==="PUT"){
        requestType="update";
        requiredFields=["password"];
        if(originalUrl.includes("professor")){role="professor"}else{role="student"};

    }else if(originalUrl.includes("delete") && method==="DELETE"){
        requestType="delete";
        if(originalUrl.includes("professor")){role="professor"}else{role="student"};
    }else{
        requestType="other"
    }  

    req.requestMetadata={
        requestType,
        requiredFields,
        role
    }

    console.log("From ReqTypeAttacher : ");
    console.log("requestType : ", requestType);
    console.log("path = ",originalUrl);
    console.log("required Fields", req.requestMetadata.requiredFields);
    console.log(" ");

    next();

}

module.exports = reqtypeAttacher;