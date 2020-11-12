module.exports = (sequelize, Sequelize) => {
	const orderItems = sequelize.define("OrderItems", {
		orderId: { type: Sequelize.INTEGER },
		serviceHierarchyId: { type: Sequelize.INTEGER },
		quantity: { type: Sequelize.INTEGER },
		orderStatus: { type: Sequelize.BOOLEAN },
		deliveryDate: { type: Sequelize.DATE },
		price: { type: Sequelize.INTEGER },
		serviceProviderId: { type: Sequelize.INTEGER },
		areaHierarchyId: { type: Sequelize.INTEGER },
		status: { type: Sequelize.BOOLEAN }
		
	});
	return orderItems;
};