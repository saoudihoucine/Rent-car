module.exports = (sequelize, Sequelize) => {
    const Employe = sequelize.define("Employe", {
        CIN_EMP: {
            type: Sequelize.STRING(50),
            allowNull: false,
            primaryKey: true
        },
        NOM: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        PRENOM: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        ADRESSE: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        NUMTEL: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        EMAIL: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        MOTDEPASSE: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    });

    return Employe;
};