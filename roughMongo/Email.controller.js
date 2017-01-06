/**
 * Created by colinjohnson on 12/15/16.
 */
'use strict';

const Emails = require('./Email.model.js');

exports.createEmail = (req, res, next) => {
  const email = req.body.email;

  if (!email) { return res.status(422).send({ error: 'you must enter your email'}) }

  let newEmail = new Emails({
    email: email
  });

  newEmail.save((err, user) => {
    if (err) { return next(err) }

    res.status(201).json({ message: "Thanks! Your request was submitted successfuly!" });
    next();
  });
};
