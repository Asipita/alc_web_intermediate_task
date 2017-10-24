const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
// const mongodb = require('mongodb');
const mongoose = require('mongoose');

const { createModel } = require('./models/createModel')

var app = express();
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/alctask', { useMongoClient: true });


app.post('/create_resource', (req, res) => {
    let { surname, firstname, lastname, date_of_birth, nationality, gender, state_of_origin, admission_number, class_in, class_out, entry_date, exit_date } = req.body;

    let createBase = new createModel({
        surname,
        firstname,
        lastname,
        date_of_birth,
        nationality,
        gender,
        state_of_origin,
        admission_number,
        class_in,
        class_out,
        entry_date,
        exit_date
    })

    createBase
        .save()
        .then((data) => {
            console.log(data);
            res
                .status(200)
                .send(`The resource for ${firstname} was created successfully`)
        }, (err) => {
            console.error(err);
            res
                .status(400)
                .send(`Error! please check that all form fields are filled correctly `)
        })
})


app.post('/list_resource', (req, res) => {

    let { admission_number } = req.body;

    createModel
        .find({ admission_number })
        .then((data) => {
            // console.log(data)
            res.send(data)
        }, (e) => {
            res.send('bad')
        })

})

app.get('/list_all', (req, res) => {
    createModel
        .find()
        .then((data) => {
            res.send(data);
        })
})

app.delete('/delete_resource', (req, res) => {
    let { admission_number } = req.body;
    createModel
        .findOneAndRemove({ admission_number })
        .then((data) => {
            // console.log(data)
            if (data !== null) {
                res.send(`the resource for ${data.admission_number} was removed successfully`)
            } else {
                res.send('bad')
            }
        }, (err) => {
            res.send(`error`)
        })
})

app.patch('/update_resource', (req, res) => {
    var { admission_number } = req.body;
    // console.log(req.body);
    var objects = {};

    if (admission_number === '') {
        return res.send(`The admission number field should not be blank`)
    }

    for (x in req.body) {
        if (x === 'admission_number') {
            continue;
        } else if (req.body[x] !== '') {
            objects[x] = req.body[x];
        }
    }

    createModel
        .findOneAndUpdate({
            admission_number
        }, {
            $set: objects
        }, {
            returnOriginal: false
        })
        .then((data) => {
            res.send(`The resource was successfully updated`)
        }, (err) => {
            res.send(`error! id ${admission_number} was not found`)
        })

})

app.listen(2000, () => {
    console.log(`app running on port 2000`);
})