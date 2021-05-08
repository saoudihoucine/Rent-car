const db = require("../models");
var crypto = require('crypto');
const Employe = db.employe;
const Op = db.Sequelize.Op;
const Ad = db.admin
const jwt = require('jsonwebtoken');




exports.create = (req, res) => {
  algorithm = 'aes-256-ctr';
  password = 'azertyuiopqsdfghjklmwxcvbn,;:!*ù^$123456789#';
  // Create a Employe
  //const MOTDEPASSE=req.body.MOTDEPASSE;
  //const hash=bcrypt.hash(MOTDEPASSE,10)
  const employe = {
    CIN_EMP: req.body.CIN_EMP,
    NOM: req.body.NOM,
    PRENOM: req.body.PRENOM,
    ADRESSE: req.body.ADRESSE,
    NUMTEL: req.body.NUMTEL,
    EMAIL: req.body.EMAIL,
    PSEUDO: req.body.PSEUDO,
    MOTDEPASSE: req.body.MOTDEPASSE



  };






  // Save Employe in the database
  Employe.create(employe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};


// Retrieve all Employes

exports.findAll = (req, res) => {
  Employe.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};


// Retrieve Employe by PK

exports.findOne = (req, res) => {
  const id = req.params.cin;

  Employe.findByPk(id)
    .then(data => {
      if (data != null) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Employe with id= ${id} was not found!`
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

  Employe.update(req.body, {
    where: { CIN_EMP: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employe was updated successfully!"
        });
      } else {
        res.send({
          message: `Employe with id= ${id} was not found!`
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

  Employe.destroy({
    where: { CIN_EMP: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employe was deleted successfully!"
        });
      } else {
        res.send({
          message: `Employe with id=${id} was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
exports.verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
    // return bearer;
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}
//login

exports.findAllPublished = (req, res) => {
  //algorithm = 'aes-256-ctr';
  //password = 'azertyuiopqsdfghjklmwxcvbn,;:!*ù^$123456789#'; 
  const email = req.body.EMAIL;
  // const mot=crypto.createDecipher(algorithm,password).update(req.body.mot,'utf8','hex')
  const mot = req.body.MOTDEPASSE;

  Employe.findAll({ where: { EMAIL: email, MOTDEPASSE: mot } })
    .then(data => {
      if (data[0]) {
        for (var i in data) {
          const req_email = data[i].EMAIL;
          const role = "Employe";
          let login = {
            "cin": data[i].CIN_EMP, "nom": data[i].NOM, "prenom": data[i].PRENOM, "email": data[i].EMAIL, "adresse": data[i].ADRESSE,
            "numTel": data[i].NUMTEL, "role": role
          }
          jwt.sign({ login }, 'secretkey', (err, token) => {
            res.json({
              message: `Good you are connected !`, req_email, role,
              token
            });

          });
        }
      }
      else {
        Ad.findAll({ where: { EMAIL: email, MOTDEPASSE: mot } })
          .then(data => {
            if (data[0]) {
              for (var i in data) {
                const req_email = data[i].EMAIL;
                const role = "Admin"

                let login = {
                  "cin": data[i].CIN_EMP, "nom": data[i].NOM, "prenom": data[i].PRENOM, "email": data[i].EMAIL, "adresse": data[i].ADRESSE,
                  "numTel": data[i].NUMTEL, "role": role
                }

                console.log(login)


                jwt.sign({ login }, 'secretkey', (err, token) => {
                  res.json({
                    message: `Good you are connected !`, req_email, role,
                    token
                  });

                });
              }
            }
            else {
              res.status(404).send("Verify your password & email !! ")
            }
          })


      }

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred !."
      });
    });
};




