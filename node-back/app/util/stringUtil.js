const bcrypt = require('bcrypt');

exports.hashPassword = (password)=> {
    return bcrypt.hashSync(password, 10);
} 

exports.compareHash = (password, hash)=>{
	return bcrypt.compareSync(password, hash);
}
