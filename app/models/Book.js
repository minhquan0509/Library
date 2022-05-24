const {Sequelize,DataTypes,Model} = require('sequelize');
const {sequelize} = require('../config/db/index.js');
class Book extends Model {}

Book.init({
    // Model attributes are defined here
    bookID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    description: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    imageLink: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Book', // We need to choose the model name
    createdAt: false,

  // If don't want updatedAt
    updatedAt: false,
});

module.exports = sequelize.models.Book;