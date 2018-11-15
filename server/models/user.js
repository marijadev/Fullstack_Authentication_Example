const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const bcrypt = require( 'bcrypt-nodejs' );

// Define a model
const userSchema = new Schema( {
	email: { type: String, unique: true, lowercase: true }, // put in object to make sure this email is never again used for registration, that is unique
	password: String
} );

//***** On Save Hook, encrypt password *****//
// Before saving a model, run this function
userSchema.pre( 'save', function ( next ) {
	//get access to the user model
	const user = this; // user.email, user.password

	// generate a salt; after that is finished run callback
	bcrypt.genSalt( 10, function ( err, salt ) {
		if ( err ) { return next( err ); }

		// hash (encrypt) our password using the salt, then run callback
		bcrypt.hash( user.password, salt, null, function ( err, hash ) {
			if ( err ) { return next( err ); }

			// overwrite plain text password with the encrypted password 
			user.password = hash;
			next();
		} );
	} );
} );

// whenever we create a user object its going to have a functions we define in methods property
userSchema.methods.comparePassword = function ( candidatePassword, callback ) {
	bcrypt.compare( candidatePassword, this.password, function ( err, isMatch ) {
		if ( err ) { return callback( err ); }
		
		callback( null, isMatch )
	} );
}

// Create the model class - ALL users in database
const ModelClass = mongoose.model( 'user', userSchema );

// Export the model
module.exports = ModelClass;
