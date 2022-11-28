let mongoose = require('mongoose');

// // create a model class
// let surveyModel = mongoose.Schema({
//     qnumber: Number,
//     type: String,
//     text: String,
//     choices: Array
// },
// {
//     collection: "survey_questions"
// });

// module.exports = mongoose.model('Survey', surveyModel);

let surveyModel = mongoose.Schema({
    title: String,
    startdate: String,
    enddate: String,
    // expires: String,
    questions:
    [
        {
            type: Number,
        }
    ]
    },
    {
        collection: 'survey_questions'
    });

module.exports = mongoose.model('Survey', surveyModel);