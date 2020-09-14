module.exports = (sequelize, Sequelize) => {
    const ServiceCategory = sequelize.define("serviceCategory", {
      icon: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return ServiceCategory;
};