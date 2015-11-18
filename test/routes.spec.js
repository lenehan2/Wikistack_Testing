var supertest = require('supertest');
var app = require('../wikistack/app');
var agent = supertest.agent(app);
var chai = require('chai');
// var expect = chai.expect;
// var spies = require('chai-spies');
// chai.use(spies);
//var mongoose = require('mongoose');
var model = require('../wikistack/models/index.js');
var Page = model.Page;
var User = model.User;
// chai.should();
// chai.use(require('chai-things'));
var Promise = require('bluebird');



var page1, page2,page3
	beforeEach(function(done){

		page1 = {
			title: 'Route1',
			content: 'Here is content', 
			tags: ['fullstack', 'table', 'testTag']
			};
	
		page2 = {
			title: 'Route2',
			content: 'Here is content #2', 
			tags: ['testTag']
			};

		page3 = {
			title: 'Route3',
			content: 'Here is content #2', 
			tags: ['ZERO']
			};

		Page.create([page1,page2,page3], done);
	});



describe('http requests', function() {

   describe('GET /', function() {
    it('gets 200 on index', function(done) {
        agent
          .get('/')
          .expect(200, done)
     })
	})

    describe('GET /add', function () {
        it('gets 404', function (done) {
        	agent
          	.get('/add')
         	.expect(404, done)

        });
    });

    describe('GET /wiki/:urlTitle', function() {

        it('gets 404 on page that doesnt exist', function(done) {
        	agent	
        	.get('/wiki/:Definitely_not_a_page')
        	.expect(404,done)
        });
        it('gets 200 on page that does exist', function(done) {
        	agent
        	.get('/wiki/Route1')
        	.expect(200,done);
        });
    });

    describe('GET /wiki/search', function() {
        it('gets 200', function(done) {
        	agent
         	.get('/wiki/search')
          	.expect(200, done)
        });
    });

    describe('GET /wiki/:urlTitle/similar', function() {
        it('gets 404 for page that doesn\'t exist', function(done) {
        	agent
         	.get('/wiki/blahblah/similar')
          	.expect(404, done)
        });
        it('gets 200 for similar page', function(done) {
        	agent
         	.get('/wiki/Route2/similar')
          	.expect(200, done)
        });
    });


    describe('GET /wiki/add', function() {
        it('gets 200', function(done) {
        	 agent
          	.get('/wiki/add')
          	.expect(200, done)
        });
    });


    describe('POST /wiki/add', function() {
        it('creates in db', function(done) {
        	agent
        	.post('/wiki')
        	.send({title: "Route4",content: "route 4 is super cool"})
			.end(function(response){
				Page.findOne({title:"Route4"})
				.then(function(page){
					chai.expect(page).to.be.ok;
					done();
				})    	
	
			}).then(null,done);
			
        	// .then(function(){
        	// 	chai.expect()
        	//});
        });
    });

});

afterEach(function(done){
	Page.find({$or: [{title: 'Route1'}, {title: 'Route2'},{title: 'Route3'},{title: "Route4"}]})
			.remove()
			.exec()
			.then(function(){
				done();
		});
	});