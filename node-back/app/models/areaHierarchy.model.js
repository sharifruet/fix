module.exports = (sequelize, Sequelize) => {
    const AreaHierarchy = sequelize.define("AreaHierarchy", 
      {
        title:          {type: Sequelize.STRING},
        areaType:       {type: Sequelize.STRING},
        parentId:       {type: Sequelize.INTEGER},
        hierarchyPath:  {type: Sequelize.STRING},
        status:         {type: Sequelize.INTEGER},
        end:            {type: Sequelize.BOOLEAN}
      }
    );
    
    return AreaHierarchy;

    
};