const db = require("../models");
const Client = db.client;
 // Send mailer to clients
 const nodemailer = require('nodemailer');
 


exports.send=(req,res)=>{
   

    // declare vars,
let fromMail = 'samer1.2014@hotmail.com';
let toMail = req.body.toMail;
let subject = 'Confirmation Asswhole';
let text = "Hello Mr Houssine you can follow Samer Agency to get your Car. " 

// email type
const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: fromMail ,
        pass: 'samir52381170'
    }
    });
   // email options
   let mailOptions = {
    from: fromMail,
    to: toMail,
    subject: subject,
    text: text,
      html: '<h1>Welcome</h1><p>Hello Mr Houssine you can follow<strong> Samer Agency</strong> to get your Car. </p><img src="https://image.freepik.com/free-vector/red-logo-black-background_1195-52.jpg " width="100" height="100"> <footer>Regards</footer>'
   
    };
    // send email
   transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
        res.send(error);
        console.log("chey");
   
    }
    res.send(response)
    console.log("yes");
   
    });
   
       };

