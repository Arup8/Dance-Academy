const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ContactDance');
const bodyParser = require('body-parser')

// Define Mongoose schema -->
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
    
});
// Schema to Model --> 
const Contact = mongoose.model('Contact', ContactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    // res.status(200).render('index.pug', params);
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    // res.status(200).render('index.pug', params);
    res.status(200).render('contact.pug', params);
})
// To save the data in database by using post request in express js the intsall body-parser -->
app.post('/contact', (req, res) => {
    const params = {}
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the Database");
    }).catch(() => {
        res.status(400).send("Item was not saved to the Database")
    });

    // res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});