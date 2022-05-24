const {Sequelize,DataTypes,Model} = require('sequelize');
const {sequelize} = require('../config/db/index.js');
class User extends Model {}

User.init({
    // Model attributes are defined here
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    createdAt: false,

  // If don't want updatedAt
    updatedAt: false,
});

module.exports = sequelize.models.User;