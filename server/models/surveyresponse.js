let mongoose = require('mongoose');
const { stringify } = require('querystring');

let surveyResponseModel = mongoose.Schema({
    surveyId: String,
    answers:
    [ {     
        qnumber: Number,
        answer: String
      }
    ]
    },
    {
        collection: 'survey_answers'
    });

module.exports = mongoose.model('SurveyResponse', surveyResponseModel);