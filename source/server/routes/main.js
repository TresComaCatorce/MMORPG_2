const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const tokenList = {};


router.get( "/", (request, response) =>
{
	response.send("Hello world from NodeJS API");
});



router.get( "/status", (request, response) =>
{
	response.status(200).json({"message": "All OK", "status": 200});
});



router.post( "/signup", passport.authenticate("signup", {"session": false}), async (request, response, next) =>
{
	response.status(200).json( {"message": "Signup successful", "status": 200} );
});



router.post( "/login", async (request, response, next) =>
{
	passport.authenticate( "login", async (error, user) => {
		try
		{
			if( error ) return next(error);

			if( !user ) return next( new Error("Email and password are required") );

			request.login( user, {"session":false}, (err) =>
			{
				if(err) return next(err);

				//Create the jwt
				const body = {
					_id: user._id,
					email: user.email,
					name: user.username
				};
				const token = jwt.sign( {user: body}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_SECRET_EXPIRES}  );
				const refreshToken = jwt.sign( {user: body}, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES}  );

				//Store tokens in cookies
				response.cookie( "jwt", token );
				response.cookie( "refreshJwt", token );

				//Store tokens in memory (TODO store in DB)
				console.log("CBF user: ", user);
				tokenList[refreshToken] = {
					token,
					refreshToken,
					email: user.email,
					_id: user._id,
					name: user.username
				};

				return response.status(200).json( { token, refreshToken, status: 200} );
			} );
		}
		catch (err)
		{
			console.log("/login |catch: ", err);
			return next(err);
		}
	} )(request, response, next);
});



router.post( "/logout", (request, response) =>
{
	if( !request.body )
	{
		response.status(400).json( {"message": "Invalid body", "status": 400} );
	}
	else
	{
		response.status(200).json( {"message": "logout", "status": 200} );
	}
});



router.post( "/token", (request, response) =>
{
	if( !request.body || !request.body.refreshToken )
	{
		response.status(400).json( {"message": "Invalid body", "status": 400} );
	}
	else
	{
		const { refreshToken } = request.body;
		response.status(200).json( {"message": `Refresh token requested for token: ${refreshToken}`, "status": 200} );
	}
});


module.exports = router;