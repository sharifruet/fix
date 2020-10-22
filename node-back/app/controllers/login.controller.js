const db = require("../models");
const jwt = require("jsonwebtoken");
const { request } = require("express");
const userModel = db.User;
const Op = db.Sequelize.Op;

const stringUtil = require("../util/stringUtil.js");

// Create and Save a new Service
exports.login = (req, res) => {
	
    // Validate request
    if (!req.body.username || !req.body.password) {
      res.status(400).send({status: 1, message: "Username and password can not be empty!"});
      return;
    }
    // Create a Service
  const username = req.body.username;
  const password = req.body.password;
  const user = {name:username};
  
  userModel.findAll({ where: {username} })
      .then(data => {
        if(data.length == 0){
			res.status(404).send({status:1, message:"User not found"});
		}else{
			const usr = data[0];

			if(stringUtil.compareHash(password, usr.password)){
				res.status(404).send({status:3, message:"Wrong password"});
			}else{
				const accessToken = generateAccessToken(user);
				const refreshToken = generateRefreshToken(user);
				refreshTokens.push(refreshToken);
				res.json({status:0, message:"Login successful", accessToken:accessToken,refreshToken:refreshToken});
			}
		}
		//res.send(data);
      })
      .catch(err => {
        res.status(500).send({status:2, message: err.message || "Some error occurred while retrieving Service."});
      });
};

function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {"expiresIn":"1m"});
}

function generateRefreshToken(user){
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

exports.authenticateToken = (req,res, next) =>{
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if(token == null) return res.sendStatus(401).send({status:2, message: "Token not found"});;
	
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
		if(err) return res.sendStatus(401).send({status:2, message: err.message});;
		req.user = user;
		next();
	});
};

exports.deleteToken = (req,res) =>{
  refreshTokens = refreshTokens.filter(token=>token!=req.body.token);
  res.sendStatus(204);
};

let refreshTokens = [];
exports.refreshToken = (req,res) =>{
	const refreshToken = req.body.token;;
	if(refreshToken == null) return res.sendStatus(401).send({status:2, message: "Refresh token not found"});
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403).send({status:2, message: "Refresh token not found"});
	
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
		if(err) return res.sendStatus(403).send({status:2, message: err.message});
		const accessToken = generateAccessToken({name:user.name});
		res.send({status:0, message:"Token refresh successful!",accessToken:accessToken});
	});
};

exports.posts = (req, res) =>{
	res.json(req.user);
};