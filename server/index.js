// main starting point of the application

const express = require( 'express' );
const http = require( 'http' );
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
const app = express(); // an instance of express
const router = require( './router' );
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );

// DB setup
mongoose.connect( 'mongodb://localhost:27017/auth', {
	"auth": { "authSource": "admin" },
	"user": "marija",
	"password": "abc123",
	"useCreateIndex": true,
	"useNewUrlParser": true
} );

// App setup
// morgan and bodyParser are like middlewares in express
//morgan is a login framework, bodyParser is parsing the data into .json
app.use( morgan( 'combined' ) );
app.use( cors() );
app.use( bodyParser.json( { type: '*/*' } ) );
router( app );




// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer( app );

server.listen( port );






