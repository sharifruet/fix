module.exports = (sequelize, Sequelize) => {
    const fileuploadModel = sequelize.define("Fileupload", {
		name: {type: Sequelize.STRING},
		description: {type: Sequelize.STRING},
		originalName: {type: Sequelize.STRING},
		type: {type: Sequelize.STRING},
		status:  {type: Sequelize.INTEGER}
    });
    return fileuploadModel;
};