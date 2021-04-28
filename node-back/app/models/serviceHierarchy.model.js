module.exports = (sequelize, Sequelize) => {
	const serviceHierarchy = sequelize.define("ServiceHierarchy", {
		title: { type: Sequelize.STRING },
		description: { type: Sequelize.STRING },
		photo: { type: Sequelize.INTEGER },
		published: { type: Sequelize.BOOLEAN },
		hierarchyPath: { type: Sequelize.STRING },
		parentId: { type: Sequelize.INTEGER },
		serviceLayer: { type: Sequelize.BOOLEAN },
		serviceGroup: { type: Sequelize.BOOLEAN },
		overview: { type: Sequelize.STRING },
		detail: { type: Sequelize.STRING },
		faq: { type: Sequelize.STRING  },
		end: { type: Sequelize.BOOLEAN },
		price: { type: Sequelize.STRING },
		status: { type: Sequelize.INTEGER }
	});
	return serviceHierarchy;
};