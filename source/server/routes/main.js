const express = require("express");
const router = express.Router();


router.get( "/", (request, response) =>
{
	response.send("Hello world from NodeJS API");
});



router.get( "/status", (request, response) =>
{
	response.status(200).json({"message": "All OK", "status": 200});
});



router.post( "/signup", (request, response, next) =>
{
	if( !request.body )
	{
		response.status(400).json( {"message": "Invalid body", "status": 400} );
	}
	else
	{
		response.status(200).json( {"message": "signup", "status": 200} );
	}
});



router.post( "/login", (request, response) =>
{
	if( !request.body )
	{
		response.status(400).json( {"message": "Invalid body", "status": 400} );
	}
	else
	{
		response.status(200).json( {"message": "login", "status": 200} );
	}
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