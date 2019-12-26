const mongoose = require("mongoose");

const { Schema } = mongoose;

const ChatSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	message: {
		type: String,
		required: true
	}
});

const ChatModel = mongoose.model( "chat", ChatSchema );

module.exports = ChatModel;