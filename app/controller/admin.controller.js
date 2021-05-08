const db = require("../models");
const admin = db.admin;
const Op = db.Sequelize.Op;



exports.update = (req, res) => {
    const id = req.params.id;
  
    admin.update(req.body, {
      where: { CIN: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Admin was updated successfully!"
          });
        } else {
          res.send({
            message: `Admin with id=${id} was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error " + err
        });
      });
  };
  //  

 

