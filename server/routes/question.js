let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

let questionController = require('../controllers/question');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the survey List page - READ Operation */
router.get('/', questionController.displayQuestionList);

/* GET Route for displaying the Add page - CREATE Operation */
// router.get('/add', requireAuth, questionController.processAddQuestionPage);
router.get('/add', questionController.displayAddQuestion);

/* POST Route for processing the Add page - CREATE Operation */
// router.post('/add', requireAuth, surveyController.processAddPage);
router.post('/add', questionController.processAddQuestionPage);


module.exports = router;