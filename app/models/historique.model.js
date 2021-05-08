module.exports = (sequelize, Sequelize) => {
  const Historique = sequelize.define("Historique", {
    IDHIS: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    LONGITUDE: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    LATITUDE: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
   /* MATRICULE: {
      type: Sequelize.STRING(50),
      allowNull: true,
      references: {
        model: 'Vehicule',
        key: 'MATRICULE'
      }
    }
*/
  });

  return Historique;
};