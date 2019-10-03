const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

app.post('/charge', (req, res) => {
      console.log("req.method",req.method)
      console.log("req.body",req.body)
      res.send(req.body)
});

exports.paynow = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
