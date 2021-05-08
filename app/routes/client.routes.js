module.exports = app => {
  const clients = require("../controller/client.controller.js");

  var router = require("express").Router();

  // Create a new client
  router.post("/", clients.create);

  // Retrieve all clients
  router.get("/", clients.findAll);

  // Retrieve a single client with id
  router.get("/:cin", clients.findOne);

  // Update a client with id
  router.put("/:cin", clients.update);

  // Delete a client with id
  router.delete("/:cin", clients.delete);



  app.use('/api/clients', router);
};