module.exports = (sequelize, Sequelize) => {
    const slidersModel = sequelize.define("Sliders", {
        title: {type:Sequelize.STRING},
        photo: {type:Sequelize.INTEGER},
		published: { type: Sequelize.BOOLEAN }
    })
    return slidersModel;
}