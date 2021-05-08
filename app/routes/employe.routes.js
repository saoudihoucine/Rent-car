module.exports = app => {
  const employes = require("../controller/employe.controller.js");

  var router = require("express").Router();

  // Create a new client
  router.post("/", employes.create);

  // Retrieve all employes
  router.get("/", employes.findAll);

  // Retrieve a single employe with id
  router.get("/:cin", employes.findOne);


  // Login
  router.post("/login", employes.findAllPublished)
 //verify  token 
 const jwt = require('jsonwebtoken');

 router.post("/verify",employes.verifyToken, (req, res) => {  
   jwt.verify(req.token, 'secretkey', (err, authData) => {
     if(err) {
       res.sendStatus(403);
     } else {
       res.json({
         authData
       });
     }
   });
 });

  // Update a employe with id
  router.put("/:cin", employes.update);

  // Delete a employe with id
  router.delete("/:cin", employes.delete);


  app.use('/api/employes', router);
};