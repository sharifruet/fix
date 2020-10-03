module.exports = (sequelize, Sequelize) => {
    const serviceHierarchy = sequelize.define("ServiceHierarchy", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      isPublished: {
        type: Sequelize.BOOLEAN
      },
	  hierarchyPath:{
		  type:Sequelize.STRING
	  },
	  parentId:{
		  type: Sequelize.BOOLEAN
	  },
	   isServiceLayer: {
        type: Sequelize.STRING
      },
	  isEnd: {
        type: Sequelize.BOOLEAN
      },
	   status: {
        type: Sequelize.STRING
      }
    });
    return serviceHierarchy;
};