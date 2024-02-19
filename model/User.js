const {model ,Schema } = require('mongoose')

const userSchema = new Schema({
    username: {
        type : String, 
        required : true, 
        unique : true
    },
    email: {
        type : String,
        unique: true 
    }, 
    password: {
        type: String,
    }

})


const User = model("User", userSchema);
module.exports = User;
