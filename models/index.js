const { Sequelize } = require('sequelize')
const configuration = require("../utils/configuration")

const User = require("./user.model")
const Animal = require("./animal.model")
const ServiceType = require("./service.type.model")
const Service = require("./service.model")

const config = configuration()
const sequelize = new Sequelize(config.database)

const database = {
  Sequelize,
  sequelize,
  User: User(sequelize, Sequelize),
  Animal: Animal(sequelize, Sequelize),
  ServiceType: ServiceType(sequelize, Sequelize),
  Service: Service(sequelize, Sequelize),
}
module.exports = database
