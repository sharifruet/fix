module.exports = (sequelize, Sequelize) => {
    const roleModel = sequelize.define("Role", {
		name: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		},
		status:  {
			type: Sequelize.INTEGER
		}
    });
    return roleModel;
};