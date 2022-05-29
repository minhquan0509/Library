const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');
const {
    sequelize
} = require('../config/db/index.js');
const Book = require('./Book');
const User = require('./User');

class Loan extends Model {}

Loan.init({
    // Model attributes are defined here
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bookID:{
        type: DataTypes.INTEGER,
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

Loan.belongsTo(Book, { foreignKey: 'bookID', foreignKeyConstraint: true });
Loan.belongsTo(User, { foreignKey: 'userEmail', foreignKeyConstraint: true });

module.exports = sequelize.models.Loan;