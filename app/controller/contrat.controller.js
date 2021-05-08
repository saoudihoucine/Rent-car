const db = require("../models");
const contrat = db.contrat;
const { vehicule } = require("../models");
const { employe } = require("../models");
const { client } = require("../models");
const Client = db.client;
var socket = require('socket.io');
// Send mailer to clients
const nodemailer = require('nodemailer');
const client_ = db.client;



exports.create = (req, res) => {

  // Create a Contract
  const cnt = {
    IDCONTR: req.body.IDCONTR,
    DATEDEB: req.body.DATEDEB,
    DATEFIN: req.body.DATEFIN,
    EmployeCINEMP: req.body.EmployeCINEMP,
    ClientCINCL: req.body.ClientCINCL,
    VehiculeMATRICULE: req.body.VehiculeMATRICULE

  };

  // Save Contract in the database
  contrat.create(cnt)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};


// Retrieve all Contracts

exports.findAll = (req, res) => {
  contrat.findAll({
    include: [{
      model: vehicule
    },
    {
      model: client
    },
    {
      model: employe
    }],

  }).then(function (response) {
    res.send(response);

  })
}


// Retrieve Contract by PK

exports.findOne = (req, res) => {
  const id = req.params.id;

  contrat.findAll({
    where: { IDCONTR: id },
    include: [{
      model: vehicule

    },
    {
      model: client
    },
    {
      model: employe
    }]

  }).then(function (response) {
    res.send(response)
  }
  )
};


// update Contract
exports.update = (req, res) => {
  const id = req.params.id;

  contrat.update(req.body, {
    where: { IDCONTR: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contract was updated successfully!"
        });
      } else {
        res.send({
          message: `Contract with id=${id} was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};


// delete Contract
exports.delete = (req, res) => {
  const id = req.params.id;

  contrat.destroy({
    where: { IDCONTR: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contract was deleted successfully!"
        });
      } else {
        res.send({
          message: `Contract with id=${id} was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error " + err
      });
    });
};

//Send  a Contract
var contrat_tab = [];
exports.SendContract = (req, res) => {
  const ID = req.body.ID;
  const date_debut = req.body.DATEDEB;
  const date_fin = req.body.DATEFIN;
  //EmployeCINEMP: req.body.EmployeCINEMP,
  const cin_client = req.body.CIN;
  const nom_client = req.body.NOM;
  const pren_client = req.body.PRENOM;
  const adrs_client = req.body.ADRESSE;
  const num_client = req.body.NUMTEL;
  const email_client = req.body.EMAIL;
  const matricule = req.body.MATRICULE;

  for (var i = 0; i < 11; i++) {
    contrat_tab.splice(contrat_tab);
    contrat_tab.push(ID);
    contrat_tab.push(date_debut);
    contrat_tab.push(date_fin);
    contrat_tab.push(cin_client);
    contrat_tab.push(nom_client);
    contrat_tab.push(pren_client);
    contrat_tab.push(adrs_client);
    contrat_tab.push(num_client);
    contrat_tab.push(email_client);
    contrat_tab.push(matricule);
    //contrat_tab.splice(contrat_tab);
    res.json({ message: "data sended..", contrat_tab })
  }

}




//SAVE  data  from Contract TAB 
exports.SaveContract = (req, res) => {
  for (var i = 0; i < 11; i++) {
    //CLIENT  DATA

    const data_client = {
      CIN_CL: contrat_tab[3],
      NOM: contrat_tab[4],
      PRENOM: contrat_tab[5],
      ADRESSE: contrat_tab[6],
      NUMTEL: contrat_tab[7],
      EMAIL: contrat_tab[8],


    };

    // Save Contract in the database
    //Contract  DATA
    const cnt = {
      IDCONTR: contrat_tab[0],
      DATEDEB: contrat_tab[1],
      DATEFIN: contrat_tab[2],
      ClientCINCL: contrat_tab[3],
      VehiculeMATRICULE: contrat_tab[9],
      EmployeCINEMP: "12345678"

    };
    sendEmail();
    // Save Contract in the database
    client_.create(data_client)
    contrat.create(cnt)

      .then(data => {
        res.send(data);

      })
      .catch(err => {
        res.status(500).send({
          message: "No Row  saved " + err
        });
      });
    contrat_tab.splice(contrat_tab);
    res.json({ message: `Good,data has been saved.. !`, cnt, data_client });
    next();

  }



}
//Refused a Contract
exports.RefuseContract = (req, res) => {
  for (var i = 0; i < 6; i++) {
    contrat_tab.splice(contrat_tab);
    res.json({ message: "Data has been  deleted..! " })
  }
};


function sendEmail(req, res) {
  for (var i = 0; i < 11; i++) {
    nom = contrat_tab[4];
    mail_to = contrat_tab[8];

  }
  // declare vars,
  let fromMail = 'samer1.2014@hotmail.com';
  let toMail = mail_to;
  let subject = 'Confirmation';
  let text = `Hello ${nom} "you can follow SHIN Agency to get your Car.`

  // email type
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: fromMail,
      pass: 'samir52381170'
    }
  });
  // email options
  let mailOptions = {
    from: fromMail,
    to: toMail,
    subject: subject,
    text: text,
    html: `<h1>Welcome</h1><p>Hello Mr ${nom} you can follow<strong> SHIN Agency</strong> to get your Car. </p><footer>Regards</footer>`

  };
  // send email
  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    }
    res.send(response)


  });

};

// get tab

exports.GetTab = (req, res) => {

  if (contrat_tab.length > 0) {
    const result = [{
      "date_debut": contrat_tab[1],
      "date_fin": contrat_tab[2],
      "cin_client": contrat_tab[3],
      "nom_client": contrat_tab[4],
      "pren_client": contrat_tab[5],
      "adrs_client": contrat_tab[6],
      "num_client": contrat_tab[7],
      "email_client": contrat_tab[8],
      "matricule": contrat_tab[9]
    }];
    res.send(result);
  } else {
    res.send([]);
  }

}



