module.exports = app => {
    const vehicule = require("../controller/vehicule.controller.js");
    const upload = require("../middleware/upload");

  
    var router = require("express").Router();
  
    // Create a new vehicule
    router.post("/",upload.single("carIMG"), vehicule.create);
  
    // Retrieve all vehicule
    router.get("/", vehicule.findAll);
    router.get("/Veh_Dispo", vehicule.findAllByEtat);
    router.get("/Veh_Indispo", vehicule.findAllVhIndsipo);

  
    // Retrieve a single vehicule
    router.get("/:matricule", vehicule.findOne);
  
    // Update a vehicule with matricule
    router.put("/:matricule", vehicule.update);
  
    // Delete a vehicule
    router.delete("/:matricule", vehicule.delete);
  
    app.use('/api/vehicule', router);
  };