module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("Client", {
    CIN_CL: {
      type: Sequelize.STRING(50),
      primaryKey: true
    },
    NOM: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    PRENOM: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    ADRESSE: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    NUMTEL: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    EMAIL: {
      type: Sequelize.STRING(50),
      allowNull: true
    }

  });

  return Client;
};