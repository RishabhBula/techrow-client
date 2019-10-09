const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const stripe = require("stripe")("sk_test_ZffCuayqkzcEjSZnDOY1rB7800ZYiGzkf3");
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

app.post('/charge', (req, res) => {
      console.log("req.method",req.method)
      console.log("req.body",req.body)
      let amount = 1;

		  stripe.customers.create({
		    email: "harikrishnan@hubspire.com",
		    card: req.body.cardToken
		  })
		  .then(customer =>
		    stripe.charges.create({
		      amount,
		      description: "Sample Charge",
		      currency: "usd",
		      customer: customer.id
		    }))
		  .then(charge => res.send(charge))
		  .catch(err => {
		    console.log("Error:", err);
		    res.status(500).send({error: "Purchase Failed"});
		  });
      // res.send(req.body)
});

exports.paynow = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
