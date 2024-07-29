'use strict'

require('dotenv').config()
const fs = require('fs')  //Libreria para inreractuar con los archivos y carpetas
const Sequelize = require('sequelize')
const process = require('process')
const path = require('path')
const basename = path.basename(__filename)//__filename variables globales que ya están cargadas en nodejs
const sequelizeDb = {}

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
//sequelize en minuiscula es la conexion a la BBDD
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

fs.readdirSync(__dirname)//Mirar el nombre de los archivo de la carpeta donde estás
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))( //Si tengo una carpeta ocn muchos archivos, mejor usar el método que se usa en index principal
      sequelize,
      Sequelize.DataTypes
    )
    sequelizeDb[model.name] = model
  })

Object.keys(sequelizeDb).forEach(modelName => {
  if (sequelizeDb[modelName].associate) {
    sequelizeDb[modelName].associate(sequelizeDb)
  }
})

sequelizeDb.sequelize = sequelize
sequelizeDb.Sequelize = Sequelize

module.exports = sequelizeDb //Es de node js que indica que este archivo sera llamado desde otro archivo y respondera sequelizeDb
//clave o propiedad y valor en los objetos json

//Cuando arranco todo se cargan las rutas y los modelos con el index.js y las rutas llaman a los controladores y el controlador llamar al
//index.js de modelos y depende la funciona que se llame en el endpoint se hace create, delete, etc- 
