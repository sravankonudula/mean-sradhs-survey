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

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, questionController.displayAddQuestion);

/* POST Route for processing the Edit page - UPDATE Operation */
// router.post('/edit/:id', passport.authenticate('jwt', {session: false}), questionController.processEditPage);
router.post('/edit/:id', questionController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', questionController.performDelete);
// router.get('/delete/:id', passport.authenticate('jwt', {session: false}), questionController.performDelete);

module.exports = router;