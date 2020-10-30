const db = require("../models");
const data = require("./master_data.json");
const AreaHierarchy = db.AreaHierarchy;
const ServiceHierarchy = db.ServiceHierarchy;
const User = db.User;
const Role = db.Role;
module.exports =  () => {
	console.log("DB Initializations");
	if(data.AreaHierarchy){
		console.log("Inserting Area Hierarchy data");
		data.AreaHierarchy.forEach((ah)=>{
			AreaHierarchy.create(ah).then((d)=>{console.log("Inserted");}).catch((e)=>{console.log("Error: "+e);});
		});
	}

	if(data.Role){
		console.log("Inserting Role data");
		data.Role.forEach((role)=>{
			Role.create(role).then((d)=>{console.log("Inserted");}).catch((e)=>{console.log("Error: "+e);});
		});
	}

	if(data.User){
		console.log("Inserting User data");
		data.User.forEach((usr)=>{
			User.create(usr).then((d)=>{console.log("Inserted");}).catch((e)=>{console.log("Error: "+e);});
		});
	}

	if(data.ServiceHierarchy){
		console.log("Inserting Service-Hierarchy data");
		data.ServiceHierarchy.forEach((sh)=>{
			ServiceHierarchy.create(sh).then((d)=>{console.log("Inserted");}).catch((e)=>{console.log("Error: "+e);});
		});
	}

    return "";
};