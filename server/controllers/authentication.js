const jwt = require( 'jwt-simple' );
const User = require( '../models/user' );
const config = require( '../config' );

// token encryption
function tokenForUser( user ) {
	const timestamp = new Date().getTime();
	// sub - short for subject(who does this token belong to), just a jwt standard
	// iat - issued at time // also exp - expiration time, aud - audience, iss - issuer...
	return jwt.encode( { sub: user.id, iat: timestamp }, config.secret )
}

exports.signin = function ( req, res, next ) {
	// user has already had their email and password auth'd, we need to give them a token

	res.send( { token: tokenForUser( req.user ) } );
}

exports.signup = function ( req, res, next ) {
	const email = req.body.email; // pull data from post request object
	const password = req.body.password;

	if ( !email || !password ) { return res.status( 422 ).send( { error: 'You must provide email and password.' } ) }

	// Check if a user with a given email exists
	User.findOne( { email: email }, function ( err, existingUser ) {
		if ( err ) { return next( err ); } //handle error if database/search failed

		// if a user with email does exists, return an error
		if ( existingUser ) {
			return res.status( 422 ).send( { error: 'Email is in use.' } );
		}

		// if a user with email does NOT exist,  create and save user record
		const user = new User( {
			email: email,
			password: password
		} );

		user.save( function ( err ) {
			if ( err ) { return next( err ); }
			// Respond to request indicating the user was created

			res.json( { token: tokenForUser( user ) } );
		} ); // save user to the database

	} );
}

