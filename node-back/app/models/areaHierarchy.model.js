module.exports = (sequelize, Sequelize) => {
    const AreaHierarchy = sequelize.define("AreaHierarchy", 
      {
        title:          {type: Sequelize.STRING},
        areaType:       {type: Sequelize.STRING},
        parentId:       {type: Sequelize.INTEGER},
        HierarchyPath:  {type: Sequelize.STRING},
        Status:         {type: Sequelize.INTEGER},
        end:            {type: Sequelize.BOOLEAN}
      }
    );
    
    return AreaHierarchy;

    
};