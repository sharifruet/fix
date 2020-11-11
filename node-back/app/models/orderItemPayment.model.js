module.exports = (sequelize, Sequelize) => {
	const orderItemPayment = sequelize.define("OrderItemPayment", {
		orderItemId: { type: Sequelize.INTEGER },
		amount: { type: Sequelize.INTEGER },
		paymentStatus : { type: Sequelize.BOOLEAN },
		paymentDate: { type: Sequelize.DATE },
		returnedDate: { type: Sequelize.DATE }
		
	});
	return orderItemPayment;
};