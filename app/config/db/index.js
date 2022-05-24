const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
  });

async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.connect = connect;
module.exports = db;