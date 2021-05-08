module.exports = app => {
  const Contrat = require("../controller/contrat.controller.js");

  var router = require("express").Router();

  // Create a new Contrat
  router.post("/", Contrat.create);

  // Retrieve all Contrats
  router.get("/", Contrat.findAll);

  // Retrieve a single client with id
  router.get("/:id", Contrat.findOne);

  // Update a Contrat with id
  router.put("/:id", Contrat.update);

  // Delete a Contrat with id
  router.delete("/:id", Contrat.delete);

  //send  a Contract
  router.post("/send", Contrat.SendContract);

  //Save  a Contract  when someone  accept  
  router.post("/Save", Contrat.SaveContract)
  //router.post("/email", Contrat.sendEmail)

  //Refused a Contract
  router.post("/refuse", Contrat.RefuseContract);
  router.post("/GetTab", Contrat.GetTab);

  app.use('/api/contrat', router);
};