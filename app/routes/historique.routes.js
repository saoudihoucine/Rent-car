module.exports = app => {
  const historiques = require("../controller/historique.controller.js");

  var router = require("express").Router();

  // Create a new client
  router.post("/", historiques.create);

  // Retrieve all historiques
  router.get("/", historiques.findAll);

  // Retrieve a single historique with id
  router.get("/:cin", historiques.findOne);

  // Update a historique with id
  router.put("/:cin", historiques.update);

  // Delete a historique with id
  router.delete("/:cin", historiques.delete);

  app.use('/api/historiques', router);
};