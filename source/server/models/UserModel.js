const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	resetToken: {
		type: String
	},
	resetTokenExpiration: {
		type: Date
	}
});



//Password encryptation
UserSchema.pre( "save", async function( next )
{
	const hash = await bcrypt.hash( this.password, 10 );
	this.password = hash;
	next();	
});



//Password verification (encrypted)
UserSchema.methods.isValidPassword = async function( password )
{
	const user = this;
	const compare = await bcrypt.compare( password, user.password );
	return compare;
};



const UserModel = mongoose.model( "user", UserSchema );

module.exports = UserModel;