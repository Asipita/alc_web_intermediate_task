const mongoose = require('mongoose')

module.exports.createModel = mongoose.model('createModel', {
    surname: {
        required: true,
        type: String,
        trim: true
    },
    firstname: {
        required: true,
        type: String,
        trim: true
    },
    lastname: {
        // required: true,
        type: String,
        trim: true
    },
    date_of_birth: {
        required: true,
        type: String,
        trim: true
    },
    gender: {
        required: true,
        type: String,
        trim: true
    },
    nationality: {
        required: true,
        type: String,
        trim: true
    },
    state_of_origin: {
        required: true,
        type: String,
        trim: true
    },
    admission_number: {
        required: true,
        type: String,
        trim: true
    },
    class_in: {
        required: true,
        type: String,
        trim: true
    },
    class_out: {
        type: String,
        trim: true
    },
    entry_date: {
        required: true,
        type: String
    },
    exit_date: {
        type: String
    }
})