const mongoose  = require("mongoose");

const verificationSchema  = new mongoose.Schema({
    email : {
        type : String
    },
    token : {
        type : String
    },
    createdAt : {
        type : Date
    },
    expiresAt : {
        type : Date
    },
})

module.exports = mongoose.model("Verification",verificationSchema)