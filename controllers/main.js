'use strict';

var data = require( '../data/data.json' );
var _ = require('underscore');
var express = require('express');

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

	//route for editing/creating an object
	server.post('/data/:id', express.json(), function( req, res ){
		var editIndex;

		res.setHeader( 'content-type', 'application/json' );
		if( !req.params.id ) res.send( JSON.stringify({error:'invalid id'}) );
		if ( !req.session.dataset ) req.session.dataset = data;

		for (var index = 0; index <= req.session.dataset.length - 1; index++  ) {
			if( req.session.dataset[index].id == req.params.id ){
				editIndex = index;
				index = req.session.dataset.length;
			}
		}

		if( editIndex === 0 || editIndex ){
			//editing object
			if( req.body ){
				for( var prop in req.body ){
					if( req.session.dataset[editIndex][prop] ) req.session.dataset[editIndex][prop] = req.body[prop];
				}
				res.send( JSON.stringify(req.session.dataset[editIndex]) );
			} else {
				res.send( JSON.stringify({error:'no payload submitted'}) );
			}
		} else {
			//creating an object
			if( req.body ){
				if( req.params.id ){
					req.body.id = req.params.id;
					req.session.dataset.push(req.body);
					res.send( JSON.stringify(req.session.dataset[editIndex]) );
				} else {
					res.send( JSON.stringify({error:'payload must contain id parameter'}) );
				}
			} else {
				res.send( JSON.stringify({error:'no payload submitted'}) );
			}
		}
	});

	//route for deleting an object (not truly restful PATCH method should be used)
	server.del('/data/:id', function(req, res, next) {
		var delIndex;

		res.setHeader( 'content-type', 'application/json' );
		if( !req.params.id ) res.send( JSON.stringify({error:'invalid id'}) );

		for (var index = 0; index <= req.session.dataset.length - 1; index++  ) {
			if( req.session.dataset[index].id == req.params.id ){
				delIndex = index;
				index = req.session.dataset.length;
			}
		}

		if( delIndex === 0 || delIndex ){
			req.session.dataset.splice(delIndex,1);
			res.send( JSON.stringify({'message':'Item with id ' + req.params.id + ' removed.'}) );
		} else {
			res.send( JSON.stringify({error:'invalid id'}) );
		}
	});
};