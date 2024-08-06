const mongoose  = require("mongoose");

const passwordResetSchema  = mongoose.Schema({
    userId : {
        type : String,
        unique : true,
    },
    email : {
        type : String,
        unique : true,
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

module.exports = mongoose.model("PasswordReset",passwordResetSchema)