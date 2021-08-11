const db = require("../models");
const jwt = require("jsonwebtoken");
const { request } = require("express");
const userModel = db.User;
const roleModel = db.Role;
const Op = db.Sequelize.Op;

const stringUtil = require("../util/stringUtil.js");


// FOR DEVELOPMENT
exports.signUp = (req, res) => {
	const phone = req.body.phone;
	const email = req.body.email;
	const password = req.body.password;

	userModel.findAll({ where: { phone: phone } })
		.then(data => {
			if (data.length > 0) {
				res.status(302).send({ status: 1, message: "Register already exists." });
			} else {
				const userEntity = { phone: phone, password:stringUtil.hashPassword(password), email:email, otp: genOtp(), status: 1 }
				addEntity(userModel, userEntity, (result) => {
					if (result.status == 0) {
						userObj = result.data;
						userObj.addRole('2');
						res.send({ status: 0, message: "Sign Up Completed", data: result });
					} else {
						res.status(500).send(result);
					}
				});
			}
		}).catch(err => {
			res.status(500).send({ status: 2, message: err.message || "Some error occurred while send sign up." });
		});
};
// END FOR DEVELOPMENT

// login user
exports.login = (req, res) => {
	// Validate request
	if (!req.body.email || !req.body.password) {
		res.status(400).send({ status: 1, message: "Username and password can not be empty!" });
		return;
	}
	// login an user
	const email = req.body.email;
	const password = req.body.password;
	const user = { name: email };

	userModel.findAll({ where: { email: email } })
		.then(data => {
			if (data.length == 0) {
				res.status(400).send({ status: 1, message: "User not found" });
			} else {
				const usr = data[0];

				if (stringUtil.compareHash(password, usr.password)) {
					const accessToken = generateAccessToken(user);
					const refreshToken = generateRefreshToken(user);
					refreshTokens.push(refreshToken);
					res.json({ status: 0, data:usr, message: "Login successful", accessToken: accessToken, refreshToken: refreshToken });
				} else {
					res.status(404).send({ status: 3, message: "Wrong password" });
				}
			}
		})
		.catch(err => {
			res.status(500).send({ status: 2, message: err.message || "Some error occurred while find user." });
		});
};

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { "expiresIn": "1m" });
}

function generateRefreshToken(user) {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

exports.authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.sendStatus(401).send({ status: 2, message: "Token not found" });;

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(401).send({ status: 2, message: err.message });;
		req.user = user;
		next();
	});
};

exports.deleteToken = (req, res) => {
	refreshTokens = refreshTokens.filter(token => token != req.body.token);
	res.sendStatus(204);
};

genOtp = function () {
	return Math.floor(Math.random() * 89999 + 10000);
}

exports.signUpOTP = (req, res) => {
	const phone = req.params.phone;
	console.log("phoneNumber = " + phone);

	userModel.findAll({ where: { phone: phone } })
		.then(data => {
			if (data.length > 0) {
				if (data[0].status == 1) {
					updateEntity(userModel, { otp: genOtp() }, data[0].id, (result) => {
						if (result.status == 0) {
							res.send(result);
						} else {
							res.status(500).send(result);
						}
					});
				} else {
					res.status(302).send({ status: 1, message: "Register already exists." });
				}
			} else {
				const userEntity = { phone: phone, otp: genOtp(), status: 1 }
				addEntity(userModel, userEntity, (result) => {
					if (result.status == 0) {
						userObj = result.data;
						userObj.addRole('2');
						res.send({ status: 0, message: "OTP Sent", data: result });
					} else {
						res.status(500).send(result);
					}
				});
			}
		}).catch(err => {
			res.status(500).send({ status: 2, message: err.message || "Some error occurred while send sign up otp." });
		});
};

exports.signInOTP = (req, res) => {
	const phone = req.params.phone;
	console.log("phoneNumber = " + phone);
	userModel.findAll({ where: { phone: phone } })
		.then(data => {
			if (data.length > 0) {
				if (data[0].status == 0) {
					updateEntity(userModel, { otp: genOtp() }, data[0].id, (result) => {
						if (result.status == 0) {
							res.send(result);
						} else {
							res.status(500).send(result);
						}
					});
				} else {
					res.status(404).send({ status: 1, message: "This number is not registered yet, please sign up." });
				}
			} else {
				res.status(404).send({ status: 1, message: "This number is not registered yet, please sign up." });
			}
		}).catch(err => {
			res.status(500).send({ status: 2, message: err.message || "Some error occurred while retrieving Service." });
		});
};

exports.verifyOTP = (req, res) => {
	const phone = req.body.phone;
	const otp = req.body.otp;

	userModel.findAll({ where: { phone: phone, otp:otp } })
		.then(result => {
			if (result.length > 0) {
				//res.send(data);
				if(!result[0].status == 0){
					updateEntity(userModel, { status: 0 }, result[0].id, (result) => {
						if (result.status == 0) {
							res.send(result);						
						} else {
							res.status(500).send(result);
						}
					});
				}
				const user = { phone: phone };
				const accessToken = generateAccessToken(user);
				const refreshToken = generateRefreshToken(user);
				refreshTokens.push(refreshToken);
				res.json({ status: 0, message: "OTP Login successful", accessToken: accessToken, refreshToken: refreshToken, data:result });

			} else {
				res.status(404).send({ status: 0, message: "OTP not found", data: result });
			}
		}).catch(err => {
			res.status(500).send({ status: 2, message: err.message || "Some error occurred while verify otp." });
		});
};

let refreshTokens = [];
exports.refreshToken = (req, res) => {
	const refreshToken = req.body.token;;
	if (refreshToken == null) return res.sendStatus(401).send({ status: 2, message: "Refresh token not found" });
	if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403).send({ status: 2, message: "Refresh token not found" });

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403).send({ status: 2, message: err.message });
		const accessToken = generateAccessToken({ name: user.name });
		res.send({ status: 0, message: "Token refresh successful!", accessToken: accessToken });
	});
};

exports.posts = (req, res) => {
	res.json(req.user);
};