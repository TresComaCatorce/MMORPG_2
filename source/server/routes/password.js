const express = require("express");
const router = express.Router();
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const crypto = require("crypto");

const UserModel = require("../models/UserModel");

const emailAddress = process.env.EMAIL_ADDRESS;
const emailPassword = process.env.EMAIL_PASSWORD;

//--------------------------------------------------------------
//Emails configuration
const smtpTransport = nodemailer.createTransport({
	service: process.env.EMAIL_PROVIDER,
	auth: {
		user: emailAddress,
		pass: emailPassword
	}
});

const handleBarsOptions = {
	viewEngine: {
		extName: ".hbs",
		defaultLayout: null,
		partialsDir: "./templates/",
		layoutsDir: "./templates/"
	},
	viewPath: path.resolve("./templates/"),
	extName: ".html"
}

smtpTransport.use( "compile", hbs(handleBarsOptions) );
//END Emails configuration
//--------------------------------------------------------------



router.post( "/forgot-password", async (request, response) =>
{
	const userEmail = request.body.email;
	const user = await UserModel.findOne( { email: userEmail } );

	if( !user )
	{
		response.status(400).json( {"message": "Invalid email", "status": 400} );
		return;
	}

	//Create user token
	const buffer = crypto.randomBytes(20);
	const token = buffer.toString("hex");

	//Update user reset password token and exp
	await UserModel.findByIdAndUpdate( { _id: user._id }, { resetToken: token, resetTokenExpiration: (Date.now()+600000) } );

	//Send user password reset email
	const emailOptions = {
		to: userEmail,
		from: emailAddress,
		template: "forgot-password",
		subject: "Zenva MMORPG Password Reset",
		context: {
			name: "KriZ",
			url: `http://localhost:${process.env.PORT || 3000}/reset-password.html?token=${token}`
		}
	};
	await smtpTransport.sendMail( emailOptions );

	response.status(200).json( {"message": `An email has been sent to ${userEmail} Password reset link is only valid for 10 minutes.`, "status": 200} );
});



router.post( "/reset-password", async (request, response) =>
{
	const userEmail = request.body.email;
	const user = await UserModel.findOne({
		resetToken: request.body.token,
		resetTokenExpiration: { $gt: Date.now() },
		email: userEmail
	});

	if( !user )
	{
		response.status(400).json( {"message": "Invalid token.", "status": 400} );
		return;
	}

	//Check if password is provided by the user and verify
	if( !request.body.password || !request.body.password_verify || request.body.password!==request.body.password_verify )
	{
		response.status(400).json( {"message": "Password do not match.", "status": 400} );
		return;
	}

	//Update user model
	user.password = request.body.password;
	user.resetToken = undefined;
	user.resetTokenExpiration = undefined;
	await user.save();

	//Send user password reset email
	const emailOptions = {
		to: userEmail,
		from: emailAddress,
		template: "reset-password",
		subject: "Zenva MMORPG Password Reset Confirmation",
		context: {
			name: user.username
		}
	};
	await smtpTransport.sendMail( emailOptions );

	response.status(200).json( {"message": "Password updated.", "status": 200} );
});


module.exports = router;