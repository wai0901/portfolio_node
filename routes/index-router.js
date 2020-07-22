const express = require('express');
const nodemailer = require('nodemailer');

const portfolioData = require('../src/portfolioData');

require('dotenv').config();

const router = express.Router();

//for sending email
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
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
            to: process.env.EMAIL,
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
                // sendMailSuccess = "success";
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