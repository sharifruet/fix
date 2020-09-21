module.exports = (sequelize, Sequelize) => {
    const AreaHierarchy = sequelize.define("areaHierarchy", {
      title: {
        type: Sequelize.STRING
      },
      areaType: {
        type: Sequelize.STRING
      },
      parentId: {
        type: Sequelize.STRING
      },
      HierarchyPath: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return AreaHierarchy;
};