/**
 * Created by colinjohnson on 12/5/16.
 */
var express = require('express'),
  app = express(),
  assert = require('assert'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Email = require('./Email.model'),
  port = 8080,
  MongoClient = require('mongodb').MongoClient,
  url = 'mongodb://localhost/example',
  createValidated,
  dbConnect;

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => { console.log('listening at port' + port) });

createValidated = (db, callback) => {
  db.createCollection('email_list', {
    validator: {
      $or: {
        email: {
          $regex: /@mongodb\.com$/
        }
      }
    }
  }, (err, results) => {
    callback();
  });
};

MongoClient.connect(url, (err, db) => {
  dbConnect = db;
  assert.equal(null, err);
  createValidated(db, () => {
    db.close();
  });
});

app.post('/api/submitemail', (req, res) => {
  var email = req.body.email;
  var collection = dbConnect.collection('emails');
  //var document = { email: email };

  collection.insert({ email }).then(() => res.send(200))
});



// display email list at path /emails
app.get('/emails', (req, res) => {
  Email.find({})
    .exec((err, emails) => {
      if (err) {
        res.send('an error occured');
      } else {
        res.json(emails);
      }
    });
});