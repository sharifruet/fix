module.exports = (sequelize, Sequelize) => {
    const serviceHierarchy = sequelize.define("ServiceHierarchy", {
      title: {type: Sequelize.STRING},
      description: {type: Sequelize.STRING},
      published: {type: Sequelize.BOOLEAN},
	    hierarchyPath:{type:Sequelize.STRING},
	    parentId:{type: Sequelize.INTEGER},
	    serviceLayer: {type: Sequelize.STRING},
	    end: {type: Sequelize.BOOLEAN},
	    status: {type: Sequelize.INTEGER}
    });
    return serviceHierarchy;
};