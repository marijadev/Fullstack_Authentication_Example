const passport = require( 'passport' );
const User = require( '../models/user' );
const config = require( '../config' );
const JwtStrategy = require( 'passport-jwt' ).Strategy;
const ExtractJwt = require( 'passport-jwt' ).ExtractJwt;
const LocalStrategy = require( 'passport-local' );

// Create Local Strategy ( by default it expects username, thats why we overwrite it; password is found automatically )
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy( localOptions, function ( email, password, done ) {
	// verify this email and password, call done with the user if it is the correct email and password,
	//this .findOne() is typically a DB call
	User.findOne( { email: email }, function ( err, user ) {
		if ( err ) { return done( err ); }
		//if user not found but there wasn't err
		if ( !user ) { return done( null, false ); }

		// compare passwords - 'password' === user.password (currently our password is salted, needs to be decrypted)
		user.comparePassword( password, function ( err, isMatch ) {
			if ( err ) { return done( err ); }
			if ( !isMatch ) { return done( null, false ); }

			return done( null, user );
		} );
	} );

	// otherwise, call done with false

} );

// Setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader( 'authorization' ), // tell JwtStrategy where to find this token inside the request
	secretOrKey: config.secret
};

// Create JWT Strategy
// payload - decoded jwt token (sub, timestamp)
const jwtLogin = new JwtStrategy( jwtOptions, function ( payload, done ) {
	// see if the user.id in the payload exists in our database
	//if it DOES, call 'done' with that object, if it DOESN'T, call 'done' without a user object
	User.findById( payload.sub, function ( err, user ) {
		// false - no, we didn't found the user, they are not authenticated
		if ( err ) { return done( err, false ); } // tell Passport that there was an error in search, and that the user is not found

		if ( user ) {
			done( null, user ); // tell Passport that the search was successful; null is instead of an error
		} else {
			done( null, false ); // tell Passport that we couldn't find the user, but there wasn't an error in search
		}
	} );
} );


// Tell passport to use this strategy
passport.use( jwtLogin );
passport.use( localLogin );
