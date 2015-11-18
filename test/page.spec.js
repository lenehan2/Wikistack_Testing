var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);
//var mongoose = require('mongoose');
var model = require('../wikistack/models/index.js');
var Page = model.Page;
var User = model.User;


describe("The Models",function(){
	describe("Schema",function(){
		
		describe("page",function(){
			var page;
			beforeEach(function(){
				page = new Page();
			});


			it("Throws an error without content",function(done){
				page.title = "Test title";
				page.validate(function(err){
					expect(err.errors).to.have.property('content');
					done();
				})
			})

			it("Throws an error without title",function(done){
				page.content = "Test content";
				page.validate(function(err){
					expect(err.errors).to.have.property('title');
					done();
				})
			})
			
			it("Creates a new page model with proper input",function(done){

				page.content = "Test content";
				page.title = '/wiki/Test_Title';
				page.validate(function(err){
					expect(err).to.be.not.ok; //is null
					done();	
				});			
			});
		});	

		describe("user",function(){

			var user;
			beforeEach(function(){
				user = new User();
			});

			it("Throws an error without name",function(done){
				user.email = 'user@example.com';
				user.validate(function(err){
					expect(err.errors).to.have.property('name');
					done();
				})

			});
			it("Throws an error without email",function(done){
				user.name = "Jon Snow";
				user.validate(function(err){
					expect(err.errors).to.have.property('email');
					done();
				})

			});
			it("Creates a new user model with proper input",function(done){
				user.name = "Jon Snow";
				user.email = 'user@example.com';
				user.validate(function(err){
					expect(err).to.be.not.ok; //is undefined
					done();
				})
			});
		});
	});

	xdescribe("Hooks",function(){

		it("Creates a random title when title is not give",function(done){})

		it("It replaces the title with a url safe title",function(done){})


	});

	describe("Statics",function(){


		describe("FindbyTag",function(){

			var page1, page2;
			beforeEach(function(done){

				page1 = {title: 'The Title',
							 content: 'Here is content', 
							tags: ['fullstack', 'table', 'testTag']
							};
				page2 = {title: 'The 2nd Title',
							 content: 'Here is content #2', 
							tags: ['testTag']
							};

				Page.create([page1,page2], done);
			});

			it("Is able to find pages by their tag", function(done){
				Page.findByTag('testTag')
				.then(function(pages){
					//console.log("pages: " + pages);
					expect(pages).to.have.lengthOf(2); //should be 2
					done();		
				})
				.then(null, done);			
			});

			it("Only gets pages with the tag", function(done){
				Page.findByTag('fullstack')
				.then(function(pages){
					expect(pages).to.have.lengthOf(1); //should be 1
					done();
				})
				.then(null, done);
			});

			it("Returns no pages when the tag doesn't exist", function(done){
				Page.findByTag('fakeTag')
				.then(function(pages){
					expect(pages).to.have.lengthOf(0); //should be 0
					done();
				})
				.then(null, done);
			});

			afterEach(function(done){
				Page.find({$or: [{title: 'The Title'}, {title: 'The 2nd Title'}]})
				.remove()
				.exec()
				.then(function(){
					done();
				});
			});

		});

		xdescribe("FindOrCreate",function(){

			it("FindOrCreate is able to find a user",function(done){

			});
			
			it("It is able to create user if none is found",function(done){

			});

		})		
	})

	xdescribe("Methods",function(){
		describe("findSimilar",function(){
			it("Is able to find pages with similar tags",function(done){

			});
			it("Never gets itself",function(done){

			});
			it("Only gets pages with similar tags",function(done){

			});
		})
	})

	xdescribe("Virtuals",function(){

		describe("route",function(){

			it("creates a url with /wiki/ + the urlTitle",function(done){

			});
		})

	})
})

