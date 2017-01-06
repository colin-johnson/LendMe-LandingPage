/**
 * Created by colinjohnson on 12/15/16.
 */
// import dependencies
const express = require('express');

// import controllers
const EmailController = require('./Email.controller.js');

module.exports = function(app) {

  const emailRoutes = express.Router();

  // apiRoutes.use('/tickets', ticketRoutes);

  emailRoutes.post('/create-new-email', EmailController.createEmail);

  // app.use('/api', apiRoutes);
};