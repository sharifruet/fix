const db = require("../models");
const data = require("./master_data.json");
const AreaHierarchy = db.AreaHierarchy;
const User = db.User;
const ServiceHierarchy = db.serviceHierarchy;
module.exports =  () => {
	console.log("DB Initializations");
	if(data.AreaHierarchy){
		console.log("Inserting Area Hierarchy data");
		data.AreaHierarchy.forEach((ah)=>{
			AreaHierarchy.create(ah).then((d)=>{console.log("Inserted");}).catch((e)=>{console.log("Error: "+e);});
		});
	}

	// if(data.ServiceHierarchy){
	// 	console.log("Inserting Service Hierarchy data");
	// 	data.ServiceHierarchy.forEach((ah)=>{
	// 		ServiceHierarchy.create(ah).then((d)=>{console.log("Inserted");}).catch((e)=>{console.log("Error: "+e);});
	// 	});
	// }

	if(data.User){
		console.log("Inserting User data");
		data.User.forEach((usr)=>{
			User.create(usr).then((d)=>{console.log("Inserted");}).catch((e)=>{console.log("Error: "+e);});
		});
	}

    return "";
};