module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("Admin", {
        CIN: {
            type: Sequelize.STRING(50),
            allowNull: false,
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
        },
        MOTDEPASSE: {
            type: Sequelize.STRING(50),
            allowNull: true
        }
    });

    return Admin;
};