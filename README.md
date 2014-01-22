##Client Side Development Test

This test is a work in progress and was developed in order to gage the following:
* Skill in client side web application development
* Proficiency with Object-Oriented JavaScript
* Ability to solve open ended problems
* Familiarity with common web application technology

###Getting Started

This application will be served on a local port (port 7000) from a node.js http server.
Here are the instructions you need to get started

1. Install Git if necessary https://help.github.com/articles/set-up-git
2. Install Node http://nodejs.org/
3. Clone AppDevTest project
    * `git clone https://github.com/dwaltz/AppDevTest.git`
4. Switch into the folder you just cloned and run `npm install`
5. Start the local app server by running this command `node app`
6. Server will be running on port 7000. Access this port and your application through `localhost:7000/` in your browser
7. All client files will be located in the public directory, modify and add files as needed for your application.

###Testing Instructions

This is a test! But don't panic, you will have as much time as you need.

#####Objectives

Create a small single page (dynamic) application that does the following:

1. Displays a collection of data in whichever format you prefer (eg. grid/feed)
	* Details: this collection can be retrieved from this endpoint `localhost:7000/data/` using a `get` method request. Payload will be returned in the form of JSON.

2. You should be able to click on one of the items in the collection and you will be taken to a more detailed view for whichever item you clicked
	* Details: this model can be retrieved from this endpoint `localhost:7000/data/:id` using a `get` method request. Payload will be returned in the form of JSON.

3. From this view you should be able to edit/delete the item or go back to the main view
	* Details:  this model can be updated from this endpoint `localhost:7000/data/:id` using a `post`/`delete` method request. When you are updating with a `post` a json payload is expected with the parameters you would like to update included.  Payload will be returned in the form of JSON.

NOTE: Data is only persisted during session and will be reset to default each time a new session is started (when you close your browser any changes you made to data will be lost).


#####Rules
The following client side JavaScript libraries must be used:
* jQuery http://jqueryui.com/
* RequireJS - for modularization of your JavaScript http://requirejs.org/

The following client side JavaScript libraries/frameworks are not required but encouraged:
* Backbone.js http://backbonejs.org/
* Underscore.js - a backbone dependency and super useful utility http://underscorejs.org/
* Handlebars - for client side templating http://handlebarsjs.com/
* requirejs/text - for loading client templates with require https://github.com/requirejs/text
* fuelux - a twitter bootstrap extension that included additional JS controls like a grid http://exacttarget.github.io/fuelux/

All of the above libraries/frameworks are included within the public/vendor directory for your use

If you would like to use additional/alternative Library's or frameworks feel free.

#####Hints:

* Dont get too hung up on design or visual details we will be looking at the code just as much as the finished product
* Feel free to contact me with questions if they come up :) im a friendly kinda guy
