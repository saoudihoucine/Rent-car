module.exports = app => {
    const email = require("../controller/email.controller.js");
  
    var router = require("express").Router();
  
    // send an email
    router.post("/", email.send);
  
     
    app.use('/api/email', router);
  };