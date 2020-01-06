const passport = require("passport");
const localStrategy = require("passport-local");
const UserModel = require("../models/UserModel");
const jwtStrategy = require("passport-jwt");

//Handle user registration
passport.use(
	"signup",
	new localStrategy.Strategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true
		},
		async ( request, email, password, done ) =>
		{
			try
			{
				const { username } = request.body;
				const user = await UserModel.create( { email, password, username } );
				return done( null, user );
			}
			catch (error)
			{
				return done(error);
			}
		}
	)
);



//Handle user login
passport.use(
	"login",
	new localStrategy.Strategy(
		{
			usernameField: "email",
			passwordField: "password"
		},
		async ( email, password, done ) =>
		{
			try
			{
				const user = await UserModel.findOne( {email} );

				if( !user )
				{
					return done( new Error("User not found"), false );
				}

				const valid = await user.isValidPassword( password );

				if( !valid )
				{
					return done( new Error("Invalid password"), false );
				}

				return done( null, user );
			}
			catch(error)
			{
				return done(error);
			}
		}
	)
);



// Verify JWT Token
passport.use(
	new jwtStrategy.Strategy(
		{
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest: request =>  ( request && request.cookies ) ? request.cookies.jwt : null
		},
		async ( token, done ) => {
			try
			{
				return done( null, token );
			}
			catch(error)
			{
				return done(error);
			}
		}
	)
);