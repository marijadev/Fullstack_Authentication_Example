const Authentication = require( './controllers/authentication' );
const passportService = require( './services/passport' );
const passport = require( 'passport' );

// a connection between the incoming request and the route handler
const requireAuth = passport.authenticate( 'jwt', { session: false } ); // don't try to create a session for the user
// intercept the request
const requireSignin = passport.authenticate( 'local', { session: false } );

module.exports = function ( app ) {
	// first pass the requireAuth step, then invoke the function 
	app.get( '/', requireAuth, function ( req, res ) {
		res.send( { hi: 'there' } );
	} );
	app.post( '/signin', requireSignin, Authentication.signin );
	app.post( '/signup', Authentication.signup );
}