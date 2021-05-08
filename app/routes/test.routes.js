module.exports = app => {
    const test = require("../controller/test.controller.js");
  
    var router = require("express").Router();
  
    // Create a new vehicule
    router.post("/", test.findAll);
    app.use('/api/test', router);
  };