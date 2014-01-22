'use strict';

var data = require( '../data/data.json' );
var _ = require('underscore');

module.exports = function( server ) {
	//redirecting to main page
	server.get( '/', function( req, res ) {
		if ( !req.session.dataset ) req.session.dataset = data;
		res.render('index');
	});

	//route for retrieving collection of data
	server.get('/data', function( req, res ){
		if ( !req.session.dataset ) req.session.dataset = data;
		res.setHeader( 'content-type', 'application/json' );
		res.send( JSON.stringify(req.session.dataset) );
	});

	//route for retrieving collection of data
	server.get('/data/:id', function( req, res ){
		var item;

		res.setHeader( 'content-type', 'application/json' );
		if( !req.params.id ) res.send( JSON.stringify({error:'invalid id'}) );
		if ( !req.session.dataset ) req.session.dataset = data;

		item = _.find(req.session.dataset, function(item){
			return item.id == req.params.id;
		});
		if( !item ) item = {error:'invalid id'};
		res.send( JSON.stringify(item) );
	});

	//route for editing an object
	server.post('/data/:id', function( req, res ){

		res.setHeader( 'content-type', 'application/json' );
		if( !req.params.id ) res.send( JSON.stringify({error:'invalid id'}) );
		if ( !req.session.dataset ) req.session.dataset = data;

	});
};