const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    first_name: {
        type : String,
        required: [true, 'First name is required']
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required']

    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],

    },
    salary: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v > 0;
            },
            message: props => `${props.value} is not a valid salary!`
        }
    }

})

const Employee = mongoose.model("Employee", empSchema);
module.exports = Employee;
