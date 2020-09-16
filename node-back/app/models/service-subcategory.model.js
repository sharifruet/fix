module.exports = (sequelize, Sequelize) => {
    const ServiceSubcategory = sequelize.define("serviceSubCategory", {
      title: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      serviceOverview: {
        type: Sequelize.STRING
      },
      faq: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return ServiceSubcategory;
};