module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("service", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return Service;
};