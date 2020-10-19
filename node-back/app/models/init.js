const db = require("../models");
const AreaHierarchy = db.AreaHierarchy;
module.exports =  () => {
	console.log("DB Initializations");
	AreaHierarchy.create(
		{id:1, title: 'Asia', areaType : "Continent", parentId : "-1", HierarchyPath : "-1-", Status : 1, end:false}
	).then((d)=>{console.log("Inserted");}).catch((e)=>{console.log("Error: "+e);});
	  
	AreaHierarchy.create(
		{id:2, title: 'Bangladesh', areaType : "Country", parentId : "1", HierarchyPath : "-1--2-", Status : 1, end:false}
	).then((d)=>{console.log("Inserted");}).catch((e)=>{console.log("Error: "+e);});

	AreaHierarchy.create(
		{id:3, title: 'Dhaka', areaType : "Division", parentId : "2", HierarchyPath : "-1--2-3", Status : 1, end:false}
	).then((d)=>{console.log("Inserted");}).catch((e)=>{console.log("Error: "+e);});
	  

    return "";
};