module.exports = (sequelize, Sequelize) => {
  const animal = sequelize.define("animal", {
    name: {
      type: Sequelize.STRING,
    },
    breed: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    weight: {
      type: Sequelize.FLOAT,
    },
    ownerName: {
      type: Sequelize.STRING,
    },
    isVacinated: {
      type: Sequelize.STRING,
    },
  })

  return animal
}