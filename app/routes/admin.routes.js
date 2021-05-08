module.exports = app => {
    const Admins = require("../controller/admin.controller.js");
  
    var router = require("express").Router();
    router.put("/:id", Admins.update);


    

    app.use('/api/admin', router);

};