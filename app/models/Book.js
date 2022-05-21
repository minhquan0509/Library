const {Sequelize,DataTypes,Model} = require('sequelize');
const sequelize = require('../../config/db');
class Book extends Model {}

Book.init({
    // Model attributes are defined here
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Book' // We need to choose the model name
});

module.exports = sequelize.models.Book;