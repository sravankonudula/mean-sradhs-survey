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
    id: String,
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
        collection: 'survey'
    });

module.exports = mongoose.model('Survey', surveyModel);