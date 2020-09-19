module.exports = (sequelize, Sequelize) => {
    const serviceHierarchy = sequelize.define("serviceHierarchy", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      ispublished: {
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
	   Status: {
        type: Sequelize.STRING
      }
    });
    return serviceHierarchy;
};