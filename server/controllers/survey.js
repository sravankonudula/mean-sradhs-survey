let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Survey = require('../models/surveyquestion');
let SurveyResponse = require('../models/surveyresponse');

module.exports.displaySurveyList = (req, res, next) => {
    console.log("inside displsy survey list");
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.json(surveyList);
        }
    });
}


module.exports.processAddSurvey = (req, res, next) => {
    debugger
    let newSurvey = Survey({
        "title": req.body.title,
        "startdate": req.body.startdate,
        "enddate": req.body.enddate,
        "questions": req.body.questions
    });

    // Add new Order Object to the Database
    Survey.create(newSurvey, (err, survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'New survey has been created successfully!!!!'});
        }
    }); 
}

module.exports.displayAddSurvey = (req, res, next) => {
    res.json({success: true, msg: 'successfully displayed the add survey'});
}


module.exports.displaySurveyResponsesList = (req, res, next) => {
    console.log("inside display survey response list");
    SurveyResponse.find((err, surveyResponseList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.json(surveyResponseList);
        }
    });
}


module.exports.processAddSurveyResponse = (req, res, next) => {
    debugger
    let newSurveyResponse = SurveyResponse({
        "surveyId": req.body.surveyId,
        "answers": req.body.answers
    });

    // Add new Order Object to the Database
    SurveyResponse.create(newSurveyResponse, (err, surveyResponse) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'New survey response has been created successfully!!!!'});
        }
    }); 
}

module.exports.displayAddSurveyResponse = (req, res, next) => {
    res.json({success: true, msg: 'successfully displayed the add survey response'});
}

// module.exports.processAddPage = (req, res, next) => {
//     let newSurvey = Survey({
//         "name": req.body.name,
//         "author": req.body.author,
//         "published": req.body.published,
//         "description": req.body.description,
//         "price": req.body.price
//     });

//     Survey.create(newSurvey, (err, Survey) =>{
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             // refresh the book list
//             //res.redirect('/book-list');
//             res.json({success: true, msg: 'successfully added new Survey'});
//         }
//     });

// }

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            // res.render('book/edit', {title: 'Edit Book', book: bookToEdit, 
            // displayName: req.user ? req.user.displayName : ''})

            res.json({success: true, msg: 'successfully displayed book to edit', book: bookToEdit});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'successfully edited survey', survey: updatedSurvey});
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             res.json({success: true, msg: 'successfully deleted Survey'});
        }
    });
}