module.exports = (sequelize, Sequelize) => {
    const Vehicule = sequelize.define("Vehicule", {
        MATRICULE: {
            type: Sequelize.STRING(50),
            allowNull: false,
            primaryKey: true,
        },
        MODELE: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        ETAT: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        IMAGE: {
            type: Sequelize.TEXT('long'),
            allowNull: true
        },
        PRIX: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        DESCRIPTION: {
            type: Sequelize.STRING(50),
            allowNull: true
        }

    });

    return Vehicule;
};