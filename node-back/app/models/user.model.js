module.exports = (sequelize, Sequelize) => {
  const userModel = sequelize.define("User", {
    name: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    otp: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    district: {
      type: Sequelize.BIGINT
    },
    upazila: {
      type: Sequelize.BIGINT
    },
    status: {
      type: Sequelize.INTEGER
    }

  });
  return userModel;
};