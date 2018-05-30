const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

const clientSchema = mongoose.Schema({
	email    : { type: String, unique: true },
	password : { type: String, required: true },
	name     : { type: String, required: true },
	client   : { type: Boolean, default: true } 
});

clientSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

clientSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Client', clientSchema);