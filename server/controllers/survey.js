let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    console.log("inside displsy survey list");
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);

            // res.render('book/list', 
            // {title: 'Books', 
            // BookList: bookList, 
            // displayName: req.user ? req.user.displayName : ''});      

            res.json(surveyList);
        }
    });
}


module.exports.processAddPage = (req, res, next) => {
    let survey = new Survey();

    for(let survey of req.body.survey)
    {
        let book = new Book(
          line.book._id,
          line.book.name,
          line.book.author,
          line.book.description,
          line.book.price  
        );
        let quantity = line.quantity;
        cart.lines.push({book, quantity});
    }
    cart.itemCount = req.body.cart.itemCount;
    cart.cartPrice = req.body.cart.cartPrice;

    // Create a new Order Object
    let newOrder = Order({
        "name": req.body.name,
        "address": req.body.address,
        "city": req.body.city,
        "province": req.body.province,
        "postalCode": req.body.postalCode,
        "country": req.body.country,
        "shipped": req.body.shipped,
        "cart": cart
    });

    // Add new Order Object to the Database
    Order.create(newOrder, (err, Order) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Added New Order'});
        }
    }); 
}

module.exports.displayAddPage = (req, res, next) => {
    // res.render('book/add', {title: 'Add Book', 
    // displayName: req.user ? req.user.displayName : ''})        
    
    res.json({success: true, msg: 'successfully displayed the add page'});
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

    let updatedBook = Book({
        "_id": id,
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.updateOne({_id: id}, updatedBook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            //res.redirect('/book-list');
            res.json({success: true, msg: 'successfully edited book', book: updatedBook});
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Book.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             //res.redirect('/book-list');

             res.json({success: true, msg: 'successfully deleted book'});
        }
    });
}