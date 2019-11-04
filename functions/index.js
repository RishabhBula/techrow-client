const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const stripe = require("stripe")("sk_test_M4SfuTn0km5hcWAZfdIl8ibc00Y2UZjKjr");
const express = require('express');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');
app.use(cors({ origin: true }));

app.post('/charge', (req, res) => {
      console.log("req.method",req.method)
      console.log("req.body",req.body)
      // let amount = 1;
      let headSetBundleCount=1;
      let headSetBundlePrice=850;
      let totalBundleCost=headSetBundleCount*headSetBundlePrice;
      let additionalHeadSetCount=req.body.additional;
      let additionalHeadSetPrice=150;
      let totalAdditionalHeadSetCost=additionalHeadSetCount*additionalHeadSetPrice;
      let orderTotalAmount=(totalBundleCost+totalAdditionalHeadSetCost)*100;

	  console.log("amount",orderTotalAmount)

      stripe.customers.create({
        email: req.body.email,
        card: req.body.cardToken
      })
      .then((customer) =>{
          stripe.charges.create({
            amount:orderTotalAmount,
            description: "Sample Charge",
            currency: "usd",
            customer: customer.id
          })
          .then((charge) => {res.send(charge) })
          .catch((err) =>{ console.log("Error2:", err); res.status(500).send({error: "Purchase charge Failed"}); })
      })
      .catch((err) => {
        console.log("Error:", err);
        res.status(500).send({error: "customer creation Failed"});
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
                console.log("erro",erro)
                return res.status(400).send(erro.toString());
            }
            console.log("info",info)
            // let contactcontent=req.body.userData.contactContent;
            // contactcontent.find((o,i) =>{
            //   if(o.id==req.body.contentdetails.id){

            //   }else{
                
            //   }
            // })
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
