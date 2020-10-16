module.exports = (sequelize, Sequelize) => {
    const privilegeModel = sequelize.define("Privilege", {
		name: {type: Sequelize.STRING},
		description: {type: Sequelize.STRING},
		menu:  {type: Sequelize.STRING},
		status:  {type: Sequelize.INTEGER}
    });
	
    return privilegeModel;
};