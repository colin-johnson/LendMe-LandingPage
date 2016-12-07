/**
 * Created by colinjohnson on 12/5/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Email', EmailSchema);