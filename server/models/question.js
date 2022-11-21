let mongoose = require('mongoose');

let Question = mongoose.Schema({
    qnumber: Number,
    qtype : String,
    qtext: String,
    choices:
    [
        {
            type: String,
        }
    ]
    },
    {
        collection: 'question'
    });

module.exports = mongoose.model('Question', Question);