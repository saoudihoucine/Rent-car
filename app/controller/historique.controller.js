const { vehicule } = require("../models");
const db = require("../models");
const Vehicule = require('../models/vehicule.model');
const Historique = db.historique;


exports.create = (req, res) => {

  // Create a Historique
  const historique = {
    LONGITUDE: req.body.LONGITUDE,
    LATITUDE: req.body.LATITUDE,
    VehiculeMATRICULE	: req.body.VehiculeMATRICULE	,
  };

  // Save Historique in the database
  Historique.create(historique)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};


// Retrieve all Historiques

/*exports.findAll = (req, res) => {
  Historique.findAll()
    .then(data => {
      //res.send(data);
      include: [{
        model: Vehicule,
        attributes: ['MATRICULE', 'ETAT', 'IMAGE', 'PRIX', 'DESCRIPTION']
      }]
    }).then(function (response) {
      console.log(response);
      res.send({ response });
    });
    )};*/

    exports.findAll = (req, res) => {
      Historique.findAll({
        include: [{
          model: vehicule
        }],
      }).then(function(response) {
          console.log(response);
          res.send(response);
        
  })
}

// Retrieve Historique by PK

exports.findOne = (req, res) => {
  const id = req.params.id;

  Historique.findByPk(id)
    .then(data => {
      if (data != null) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Historique with id= ${id} was not found!`
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
  const id = req.params.id;

  Historique.update(req.body, {
    where: { IDHIS: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Historique was updated successfully!"
        });
      } else {
        res.send({
          message: `Historique with id=${id} was not found!`
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
  const id = req.params.id;

  Historique.destroy({
    where: { IDHIS: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Historique was deleted successfully!"
        });
      } else {
        res.send({
          message: `Historique with id=${id} was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};