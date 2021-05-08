module.exports = (sequelize, Sequelize) => {
    const Contrat = sequelize.define("Contrat", {
        IDCONTR: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        DATEDEB: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        DATEFIN: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        
        /*CIN_EMP: {
            type: Sequelize.STRING(50),
            allowNull: true,
            references: {
                model: 'Employes',
                key: 'CIN_EMP'
            }
        },
        CIN_CL: {
            type: Sequelize.STRING(50),
            allowNull: true,
            references: {
                model: 'Clients',
                key: 'CIN_CL'
            }
        },
        MATRICULE: {
            type: Sequelize.STRING(50),
            allowNull: true,
            references: {
                model: 'Vehicules',
                key: 'MATRICULE'
            }
        }*/

    });

    return Contrat;
};