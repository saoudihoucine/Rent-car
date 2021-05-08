const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  define: {
    timestamps: false
  },

  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.client = require("./client.model.js")(sequelize, Sequelize);
db.employe = require("./employe.model.js")(sequelize, Sequelize);
db.vehicule = require("./vehicule.model.js")(sequelize, Sequelize);
db.historique = require("./historique.model.js")(sequelize, Sequelize);
db.contrat = require("./contrat.model.js")(sequelize, Sequelize);

//Association between VH & HIS
db.vehicule.hasMany(db.historique);
db.historique.belongsTo(db.vehicule);

//Association between VH & HIS
db.vehicule.hasMany(db.contrat);
db.contrat.belongsTo(db.vehicule);

db.client.hasMany(db.contrat);
db.contrat.belongsTo(db.client);

db.employe.hasMany(db.contrat);
db.contrat.belongsTo(db.employe);


module.exports = db;