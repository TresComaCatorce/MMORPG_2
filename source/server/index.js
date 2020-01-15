require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const routes = require("./routes/main");
const passwordRoutes = require("./routes/password");
const secureRoutes = require("./routes/secure");



//Setup mongo connection
const uri = process.env.MONGO_CONNECTION_URL;
const mongoConfig =
{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}
if( process.env.MONGO_USER_NAME && process.env.MONGO_PASSWORD )
{
	mongoConfig.auth = { authSource: "admin" };
	mongoConfig.user = process.env.MONGO_USER_NAME;
	mongoConfig.pass = process.env.MONGO_PASSWORD;
}
mongoose.connect( uri, mongoConfig );
mongoose.connection.on( "error", (err) =>
{
	console.log(err);
	process.exit(1);
})


mongoose.set( "useFindAndModify", false );


const app = express();
const port =  process.env.SERVER_PORT || 3000;
const cors_origin = process.env.CORS_ORIGIN;


//Express settings
app.use( bodyParser.urlencoded( {"extended": false} ) );
app.use( bodyParser.json() );
app.use( cookieParser() )
app.use( cors( {"credentials": true, "origin":  cors_origin} ) )


//Require passport auth
require("./auth/auth");

app.get( "/game.html", passport.authenticate( "jwt", {session: false} ), ( request, response ) => {
	response.status(200).json( request.user );
});

//Configure static folder to express
app.use( express.static( __dirname + "/public" ) );

//Set index.html for root path requests
app.get( "/", ( request, response ) =>
{
	response.send( __dirname + "/index.html" );
});


//Setup routes
app.use( "/", routes );
app.use( "/", passwordRoutes );
app.use( "/", passport.authenticate("jwt", {"session": false}), secureRoutes );



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



mongoose.connection.on( "connected", () =>
{
	console.log("Connected to mongo.");

	app.listen( port, () =>
	{
		console.log(`Server is running on port: ${port}`);
	});
} );