module.exports = (sequelize, Sequelize) => {
  const serviceType = sequelize.define("serviceType", {
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DOUBLE,
    },
    duration: {
      type: Sequelize.STRING,
    },
  })

  return serviceType
}