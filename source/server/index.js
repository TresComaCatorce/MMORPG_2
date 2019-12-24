const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes/main");
const passwordRoutes = require("./routes/password")

const app = express();
const port = 3000;


//Express settings
app.use( bodyParser.urlencoded( {"extended": false} ) );
app.use( bodyParser.json() );


//Setup routes
app.use( "/", routes );
app.use( "/", passwordRoutes );



//Catch all other routes (Error 404)
app.use( (request, response) => {
	response.status(404).json(
		{
			"message": "404 Not Found",
			"status": 404
		}
	);
});



//Handling errors (Error 500)
app.use( (error, request, response, next) => {
	response.status(error.status || 500).json(
		{
			"error": error.message,
			"status": 500
		}
	);
});



app.listen( port, () =>
{
	console.log(`Server is running on port: ${port}`);
});