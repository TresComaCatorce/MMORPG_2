const express = require("express");
const router = express.Router();



router.post( "/forgot-password", (request, response) =>
{
	if( !request.body || !request.body.email )
	{
		response.status(400).json( {"message": "Invalid body", "status": 400} );
	}
	else
	{
		const { email } = request.body;
		response.status(200).json( {"message": `Forgot password requested for email: ${email}`, "status": 200} );
	}
});



router.post( "/reset-password", (request, response) =>
{
	if( !request.body || !request.body.email )
	{
		response.status(400).json( {"message": "Invalid body", "status": 400} );
	}
	else
	{
		const { email } = request.body;
		response.status(200).json( {"message": `Password reset requested for email: ${email}`, "status": 200} );
	}
});


module.exports = router;