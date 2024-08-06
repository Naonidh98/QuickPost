const mongoose  = require("mongoose");

const verificationSchema  = mongoose.Schema({
    userId : {
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