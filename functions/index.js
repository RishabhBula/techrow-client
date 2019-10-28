const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const stripe = require("stripe")("sk_test_ZffCuayqkzcEjSZnDOY1rB7800ZYiGzkf3");
const express = require('express');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');
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

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'harikrishnan@hubspire.com',
        pass: 'hk@hubspire47Gmail'
    }
});

app.post('/send', (req, res) => {

		const mailOptions = {
            from: req.body.userdata.email, // Something like: Jane Doe <janedoe@gmail.com>
            to: 'harikrishnan@hubspire.com',
            subject: 'Contact Access Content', // email subject
            html: `<div>
                    <span>Hi TechRow</span><br/>
                    <p>The user ${req.body.userdata.firstName} (${req.body.userdata.email}) contacted to access the following content.</p><br/>
                    <img style="width: 50%; height: 100px" src=${req.body.contentdetails.thumbnail}/><br/>
                    <p>Name : ${req.body.contentdetails.name}</p>
                    <p>Description : ${req.body.contentdetails.description}</p>
                   </div>` // email content in HTML
        };

        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
      
      // res.send(req.body)
});

exports.sendmail = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
