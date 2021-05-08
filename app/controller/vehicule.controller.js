const db = require("../models");
const vehicule = db.vehicule;
const Op = db.Sequelize.Op;
var fs = require('fs');

exports.create = (req, res) => {

  // Create a vehicule
  const Vh = {
    MATRICULE: req.body.MATRICULE,
    ETAT: "Dispo",
    // IMAGE: fs.readFileSync("./app/imgs/" + req.file.filename),
    IMAGE: req.body.IMAGE,
    MODELE : req.body.MODELE,
    PRIX: req.body.PRIX,
    DESCRIPTION: req.body.DESCRIPTION

  };

  //fs.writeFileSync("./app/imgs/" + req.file.name, req.file.data);

  // Save Vehiclue in the database
  vehicule.create(Vh)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};

// Retrieve all vehiculs where dispo


exports.findAllByEtat = (req, res) => {
  vehicule.findAll( {
    where: { ETAT: "Dispo" }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};


// Vehiculs indspo

exports.findAllVhIndsipo = (req, res) => {
  vehicule.findAll( {
    where: { ETAT: ("Maintenance","Louer") }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};



// Retrieve all vehiculs

exports.findAll = (req, res) => {
  vehicule.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};


// Retrieve vehicule by MATRICULE

exports.findOne = (req, res) => {
  const mat = req.params.matricule;

  vehicule.findByPk(mat)
    .then(data => {
      if (data != null) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Vehicule with MATRICULE= ${mat} was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};



exports.update = (req, res) => {
  const mat = req.params.matricule;



  vehicule.update(req.body, {
    where: { MATRICULE: mat }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vehicule was updated successfully!"
        });
      } else {
        res.send({
          message: `Vehicule with MATRICULE=${mat} was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};



exports.delete = (req, res) => {
  const mat = req.params.matricule;

  vehicule.destroy({
    where: { MATRICULE: mat }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vehicule was deleted successfully!"
        });
      } else {
        res.send({
          message: `Vehicule with MATRICULE=${mat} was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};