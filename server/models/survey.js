let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    qnumber: Number,
    type: String,
    text: String,
    choices: Array
},
{
    collection: "survey_questions"
});

module.exports = mongoose.model('Survey', surveyModel);