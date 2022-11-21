let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Question = require('../models/question');

module.exports.displayQuestionList = (req, res, next) => {
    console.log("inside display questions list");
    Question.find((err, questionList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.json(questionList);
        }
    });
}


module.exports.processAddQuestionPage = (req, res, next) => {

    // Create a new Order Object
    let newQuestion = Question({
        "qnumber": req.body.qnumber,
        "qtype": req.body.qtype,
        "qtext": req.body.qtext,
        "choices": req.body.choices
    });

    // Add new Order Object to the Database
    Question.create(newQuestion, (err, que) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Added New Question'});
        }
    }); 
}

module.exports.displayAddQuestion = (req, res, next) => {
    // res.render('book/add', {title: 'Add Book', 
    // displayName: req.user ? req.user.displayName : ''})        
    
    res.json({success: true, msg: 'successfully displayed the question page'});
}

