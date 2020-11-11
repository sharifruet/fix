module.exports = (sequelize, Sequelize) => {
	const order = sequelize.define("Order", {
		orderNumber: { type: Sequelize.STRING },
		userId: { type: Sequelize.INTEGER },
		cartOrOrder: { type: Sequelize.BOOLEAN },
		orderDate: { type: Sequelize.DATE },
		paymentType: { type: Sequelize.STRING },
		 status: { type: Sequelize.BOOLEAN}
		
	});
	return order;
};