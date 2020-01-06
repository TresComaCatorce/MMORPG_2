const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const tokenList = {};


router.get( "/", (request, response) =>
{
	response.send("Hello world from NodeJS API");
});



router.get( "/status", passport.authenticate("jwt", {"session": false}), async (request, response) =>
{
	response.status(200).json( { message: "All OK", status: 200 } );
});



router.post( "/signup", passport.authenticate("signup", {"session": false}), async (request, response, next) =>
{
	response.status(200).json( { message: "Signup successful", status: 200 } );
});



router.post( "/login", async (request, response, next) =>
{
	passport.authenticate( "login", async (error, user) => {
		try
		{
			if( error ) return next(error);

			if( !user ) return next( new Error("Email and password are required") );

			request.login(
				user,
				{ session: false },
				(err) =>
				{
					if(err) return next(err);

					//Create the jwt
					const body = {
						_id: user._id,
						email: user.email,
						username: user.username
					};
					const token = jwt.sign( {user: body}, process.env.JWT_SECRET, {expiresIn: 300}  );
					const refreshToken = jwt.sign( {user: body}, process.env.JWT_REFRESH_SECRET, {expiresIn: 86400}  );

					//Store tokens in cookies
					response.cookie( "jwt", token );
					response.cookie( "refreshJwt", token );

					//Store tokens in memory (TODO store in DB)
					tokenList[refreshToken] = {
						token,
						refreshToken,
						email: user.email,
						_id: user._id,
						username: user.username
					};

					return response.status(200).json( { token, refreshToken, status: 200} );
				}
			);
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
	if( request.cookies && ( request.cookies.jwt || request.cookies.refreshJwt) )
	{
		const refreshToken = request.cookies.refreshJwt;

		//Delete token from memory (TODO delete from DB)
		if( refreshToken in tokenList ) delete tokenList[refreshToken];

		response.clearCookie( "jwt" );
		response.clearCookie( "refreshJwt" );

		response.status(200).json( { message: "Logged out", status: 200 } );
	}
	else
	{
		response.status(400).json( { message: "Not logged in", status: 200 } );
	}
});



router.post( "/token", (request, response) =>
{
	if( !request.body || !request.body.refreshToken )
	{
		response.status(400).json( { message: "Invalid body", status: 400 } );
	}
	else
	{
		const { refreshToken } = request.body;

		if( refreshToken in tokenList )
		{
			const body = {
				email: tokenList[refreshToken].email,
				_id: tokenList[refreshToken]._id,
				username: tokenList[refreshToken].username
			};

			const token = jwt.sign
			(
				{ user: body },
				process.env.JWT_SECRET,
				{ expiresIn: 300 }
			);

			// Update JWT
			response.cookie( "jwt", token );
			tokenList[refreshToken].token = token;

			response.status(200).json( { token, status: 200 } );
		}
		else
		{
			response.status(401).json( { message: "Unauthorized", status: 401 } );
		}
	}
});


module.exports = router;