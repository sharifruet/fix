module.exports = (sequelize, Sequelize) => {
    const userServiceModel = sequelize.define("userservices", {
        userId: {type:Sequelize.INTEGER},
        serviceId: {type:Sequelize.INTEGER},
        areaId: {type:Sequelize.INTEGER}
    })
    return userServiceModel;
}