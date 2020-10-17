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

    AreaHierarchy.sync().then(() => {
      AreaHierarchy.create({
        title: 'Neuquen',
        areaType : "mohishalbari",
        parentId : "1",
        HierarchyPath : "1-2",
        Status : "Active",
        published : true
      });
    });

    return AreaHierarchy;

    
};