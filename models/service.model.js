module.exports = (sequelize, Sequelize) => {
  const service = sequelize.define("service", {
    serviceType: {
      type: Sequelize.STRING,
    },
    animal: {
      type: Sequelize.STRING,
    },
    scheduledDate: {
      type: Sequelize.STRING,
    },
  })

  return service
}