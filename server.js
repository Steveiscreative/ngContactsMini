/**
 * A simple node server using Express
 */
// Dependencies
var app_root = __dirname,
    port = 4001,
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path');

// Create Server
var app = express();

// DB setup
mongoose.connect('mongodb://localhost/ng_contacts_mini');

// Contact Schema
var Contact = new mongoose.Schema({
    first_name: String,
    last_name: String,
    address_1: String,
    address_2: String,
    email: String,
    phone_number: String
});

// Model
var ContactModel = mongoose.model('Contact', Contact);

// Configure server
app.configure(function () {
    //parses request body and populates request.body
    app.use(express.bodyParser());

    //checks request.body for HTTP method overrides
    app.use(express.methodOverride());

    //perform route lookup based on url and HTTP method
    app.use(app.router);

    //Where to serve static content
    app.use(express.static(path.join(app_root, 'src')));

    //Show all errors in development
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

// Setup Endpoints

/* --------------------------------------------------------
 api/contacts        GET         return all contacts
 api/contacts/:id    GET         return specified contact
 api/contacts        POST        add new contact
 api/contacts/:id    PUT         update specified contact
 api/contacts:/:id   DELETE      delete specified contact
 ----------------------------------------------------------- */

// return all contacts
app.get('/api/contacts', function (request, response) {
    ContactModel.find(function (err, contacts) {
        if (!err) {
            return response.send( contacts );
        } else {
            return console.log(err);
        }
    })
});
// get specified (:id ) contact
app.get('/api/contacts/:id', function (request, response) {
    ContactModel.findById(request.params.id, function (err, contact) {
        if (!err) {
            return response.send(contact);
        } else {
            return console.log(err);
        }
    });
});
// add new contact
app.post('/api/contacts', function (request, response) {
    var contact = new ContactModel({
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        address_1: request.body.address_1,
        address_2: request.body.address_2,
        email: request.body.email,
        phone_number: request.body.phone_number
    });

    return contact.save(function (err) {
        if (!err) {
            console.log('Contact has been created.');
            return response.send(contact);
        } else {
            console.log(err);
        }
    });
});

// Update contact by id
app.put('/api/contacts/:id', function (request, response) {
    return ContactModel.findById(request.params.id, function (err, contact) {
        contact.first_name = request.body.first_name,
        contact.last_name = request.body.last_name,
        contact.address_1 = request.body.address_1,
        contact.address_2 = request.body.address_2,
        contact.email = request.body.email,
        contact.phone_number = request.body.phone_number

        return contact.save(function(err){
            if(!err) {
                console.log('Contact updated!');
                return response.send(contact);
            } else {
                console.log(err);
            }
        })
    });
});

// delete contact
app.delete('/api/contacts/:id', function(request, response) {
    return ContactModel.findById(request.params.id, function(err, contact) {
        return contact.remove( function(err) {
            if(!err) {
                console.log('Contact deleted');
                return response.send('');
            } else {
                console.log(err);
            }
        })
    })
})


 app.listen(port, function(){
    console.log('Express server up and running');
 });
