const {Sequelize,DataTypes,Model} = require('sequelize');
const {sequelize} = require('../config/db/index.js');
class Loan extends Model {}

Loan.init({
    // Model attributes are defined here
    ID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    issueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      returnDate: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM,
        values: [
          "inProgress",
          "overdue",
          "closed"
        ],
      },
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Loan', // We need to choose the model name
    createdAt: false,

  // If don't want updatedAt
    updatedAt: false,
});

module.exports = sequelize.models.Loan;