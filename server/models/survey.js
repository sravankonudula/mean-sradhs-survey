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
    _id: String,
    title: String,
    questions:
    [
        {
            name: String,
            author: String,
            published: String,
            description: String,
            price: Number
        }
    ]
    },
    {
        collection: 'survey_questions'
    });

module.exports = mongoose.model('Survey', surveyModel);