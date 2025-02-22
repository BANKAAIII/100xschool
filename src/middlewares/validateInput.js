const express = require("express");
const signupSchema = require("../utils/zodSchema/signupSchema");
const signinSchema = require("../utils/zodSchema/signinSchema");
const updateSchema = require("../utils/zodSchema/updateSchema");
const { request } = require("http");
const {bodyParser}=  require("body-parser");
const { error } = require("console");


function validateInput(req, res, next) {

    const schemas = {
        signup :signupSchema,
        signin :signinSchema,
        update :updateSchema
    }

    if (!req.requestMetadata || !req.requestMetadata.requiredFields) {
        return res.status(500).json({ error: "Request metadata is missing" });
    }

    const { requiredFields } = req.requestMetadata;
    console.log("required Fields : ");
    
    const missingFields = [];

    // Check if required fields exist in req.body
    for (let i = 0; i < requiredFields.length; i++) {
        if (!req.body[requiredFields[i]] ) {
            // Checks the Whole req.body for the requried fields
            missingFields.push(requiredFields[i]);
        }
    }

    if (missingFields.length > 0) {
        return res.status(400).json({ error: "Missing required fields", missingFields });
    }

    const schema = schemas[req.requestMetadata.requestType];
    // this will select the schema.

    const result = schema.safeParse(req.body);
    

    if(!result.success){
        return res.status(400).json({
                status:error,
                message:"Missing body and zod validation middleware failed",
                currentData:{
                    requestType:req.requestMetadata.requestType,
                    missingFields:missingFields
                }
        }) 
    }

    console.log("Form the validateInput : ");
    console.log("All required fields are present.");
    console.log(" ");
    next();
}

module.exports = validateInput;
