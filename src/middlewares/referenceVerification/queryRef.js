const mongoose = require('mongoose');

//  PROBLEM : When converting to an objectId it is depreciating as a number.

async function queryRef({ idString, reference }) {
    let objectid;
   
    // Check if the idString is a Valid ObjecctId
    const stepOne = mongoose.isValidObjectId(idString);

    console.log("checking if idString is valid");
    if(!stepOne){
        console.log("idString is not valid");
        console.log("converting to ObjectId.......");
    }

    
    objectid = idString;

    // Query the reference collection
    const stepTwo = await reference.findOne({ _id: objectid });

    // Return true if document exists, otherwise false
    return !!stepTwo;
}

module.exports = queryRef;
