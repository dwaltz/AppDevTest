'use strict';

var data = require( '../data/data.json' );

module.exports = function( server ) {
	server.get( '/', function( req, res ) {
		res.render('index');
	});
};