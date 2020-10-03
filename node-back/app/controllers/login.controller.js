const db = require("../models");
const jwt = require("jsonwebtoken");
const { request } = require("express");
const userDao = db.userDao;
const Op = db.Sequelize.Op;

// Create and Save a new Service
exports.login = (req, res) => {
	
    // Validate request
    if (!req.body.username || !req.body.password) {
      res.status(400).send({
		  code: ERR001,
		  message: "Content can not be empty!"
      });
      return;
    }
    // Create a Service
  const username = req.body.username;
  const password = req.body.password;
  const user = {name:username};
  
  userDao.findAll({ where: {username} })
      .then(data => {
        console.log(data);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
		res.json({accessToken:accessToken,refreshToken:refreshToken});
		//res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Service."
        });
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
	if(token == null) return res.sendStatus(401);
	
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
		if(err) return res.sendStatus(401);
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
  if(refreshToken == null) return res.sendStatus(401);
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
	
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
		if(err) return res.sendStatus(403);
		const accessToken = generateAccessToken({name:user.name});
		res.json({accessToken:accessToken});
	});
};


exports.posts = (req, res) =>{
	res.json(req.user);
};