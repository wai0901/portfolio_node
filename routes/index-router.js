const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const portfolioData = require('../src/portfolioData');

require('dotenv').config();

const router = express.Router();


const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "oceangraphy.info@gmail.com", 
         clientId: process.env.CLIENT_ID,
         clientSecret: process.env.CLIENT_SECRET,
         refreshToken: process.env.REFRESH_TOKEN,
         accessToken: accessToken
    }
});

// let successtMessage = "Thank you for contacting me, I will get back to you ASAP!";
let sendMailSuccess;
let contactMessage;
let contactMessageStyle;

// /* GET home page. */
function homeGet(req, res) {
    res.render('index', { portfolioData: portfolioData, 
                          sendMailSuccess: sendMailSuccess, 
                          contactMessage: contactMessage,
                          contactMessageStyle: contactMessageStyle });
    sendMailSuccess = '';
    contactMessage = '';
}

// /* POST home page. */
function homePost(req, res, next) {

    if (req.body.email && req.body.text) {
        let mailOptions = {
            from: process.env.EMAIL,
            to: 'waileung0830@gmail.com',
            subject: req.body.email, 
            text: req.body.text
        };
        
        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                console.log('Error Occurs', err);
                sendMailSuccess = "error";
                contactMessage = "Something wrong, please try again.";
            } else {
                console.log('Email send!');
                sendMailSuccess = "success";
                contactMessageStyle = "message-container-show";
                contactMessage = "Thank you for contacting me, I will get back to you ASAP!";
                return next()
            }
        });
    } else {
        console.log("Missing email input or message input");
        sendMailSuccess = "error";
        contactMessage = "Please enter both email and message.";
    }
}

router.get('/', homeGet);

router.post('/', homePost, homeGet);

module.exports = router;