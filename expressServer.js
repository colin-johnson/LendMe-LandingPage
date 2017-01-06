/**
 * Created by colinjohnson on 12/5/16.
 */
var express = require('express'),
  app = express(),
  path = require('path'),
  assert = require('assert'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Email = require('./Email.model'),
  port = 3000,
  MongoClient = require('mongodb').MongoClient,
  url = 'mongodb://localhost:27017/example',
  createValidated,
  dbConnect;

mongoose.connect(url);

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.post('/api/submitemail', (req, res) => {
  var email = req.body.email;
  var doc = new Email({ email });

  doc.save()
    .then(function (_doc) {
      res.status(200).send(_doc);
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    })
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function () {
  console.log('server running at http://localhost:' + port);
});