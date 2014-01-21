'use strict';

var pkg     = require( './package.json' );
var http    = require( 'http' );
var express = require( 'express' );
var app     = express();
var mainController = require( './controllers/main' );

//Handlebars server side templating
var exphbs    = require( 'express3-handlebars' );
var hbs       = exphbs.create( { defaultLayout: 'main' } );

app.configure( function() {
	// gzipping for fun
	app.use( express.compress() );

	// setting http server port
	app.set( 'port', process.env.PORT || 4200 );

	// serving front-facing app from static place
	app.use( express.static( __dirname + 'public' ) );

	// Simulation for PUT and DELETE
	app.use( express.methodOverride() );

	//Request object contains client cookies
	app.use( express.cookieParser() );

	// using express3 handlebars for templating
	app.engine( 'handlebars', hbs.engine );
	app.set( 'view engine', 'handlebars' );
	app.set( 'views', __dirname + '/views/' );

	//Session middleware for false server side storage
	app.use( express.session({
		store: new express.session.MemoryStore()
		, secret: 'mcSecret!@#$'
		, key: 'mcKey'
	} ) );
});

//Middleware for all routs
mainController( app );

//Using router middleware
app.use( app.router );

//Creating server and listening to port defined
http.createServer( app ).listen( app.get( 'port' ) );
console.log( 'Express server for '+ pkg.name +' started on port %d in %s mode', app.get( 'port' ), process.env.NODE_ENV || 'local' );
