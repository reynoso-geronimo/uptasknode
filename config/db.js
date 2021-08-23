const Sequelize = require('sequelize');
//extrar variables.env
require ('dotenv').config({path:'variables.env'})

const db = new Sequelize(
    process.env.BD_NOMBRE,
    process.env.BD_USER,
    process.env.BD_PASS,
    {
    host: process.env.BD_HOST,
    dialect: 'mysql',
    port:process.env.BD_PORT,
    operatorsAliases: 0,
    define:{
        timestamps:0
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

});

module.exports = db;