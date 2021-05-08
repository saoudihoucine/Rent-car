const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const app = express();
const multer = require("multer");



// const storage = multer.diskStorage({
//   destination: './app/imgs',
//   filename: (req, file, cb) => {
//     cb(null, `${req.MATRICULE}_${file.originalname}`);
//   },
// });


// const upload = multer({
//   storage: storage
// })

// app.post("/upload", upload.single('profile'), (req, res) => {
//   res.json({ message: req.file.originalname });
// });




















// var corsOptions = {
//   origin: "http://localhost:4200",
//   origin: "http://localhost:8101",
// };


app.use(cors());


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Nya hhhhh , Nya hohoh" });
});

db.sequelize.sync();
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
}).catch(err => {
  console.log("Error \n", err)
});


//Routes
require("./app/routes/client.routes")(app);
require("./app/routes/employe.routes")(app);
require("./app/routes/historique.routes")(app);
require("./app/routes/vehicule.routes")(app);
require("./app/routes/test.routes")(app);
require("./app/routes/contrat.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});