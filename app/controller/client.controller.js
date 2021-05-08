const db = require("../models");
const Client = db.client;
const Vehicule=db.vehicule;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  
  // Create a Client
  const client = {
    CIN_CL: req.body.CIN_CL,
    NOM: req.body.NOM.toUpperCase(),
    PRENOM: req.body.PRENOM,
    ADRESSE: req.body.ADRESSE,
    NUMTEL: req.body.NUMTEL,
    EMAIL: req.body.EMAIL

  };

  // Save Client in the database
  Client.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};


// Retrieve all clients

exports.findAll = (req, res) => {
  Client.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};



// Retrieve client by PK

exports.findOne = (req, res) => {
  const id = req.params.cin;

  Client.findByPk(id)
    .then(data => {
      if (data != null) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Client with id= ${id} was not found!`
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
  const id = req.params.cin;

  Client.update(req.body, {
    where: { CIN_CL: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Client was updated successfully!"
        });
      } else {
        res.send({
          message: `Client with id=${id} was not found!`
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
  const id = req.params.cin;

  Client.destroy({
    where: { CIN_CL: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Client was deleted successfully!"
        });
      } else {
        res.send({
          message: `Client with id=${id} was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};

