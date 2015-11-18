var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);
//var mongoose = require('mongoose');
var model = require('../wikistack/models/index.js');
var Page = model.Page;
var User = model.User;
chai.should();
chai.use(require('chai-things'));


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

		describe("FindOrCreate",function(){

			var user;
			beforeEach(function(done){

				user = {name: 'Jon Snow',
						email: 'jon@snow.com', 
						};

				User.create([user], done);
			});

			it("FindOrCreate is able to find a user",function(done){
				User.findOrCreate({name: 'Jon Snow',email:'jon@snow.com'})
				.then(function(user){
					expect(user.email).to.equal('jon@snow.com');
					done()
				})
				.then(null,done);
			});
			
			it("It is able to create user if none is found",function(done){
				User.findOrCreate({name: 'Arya Stark',email:'needle@sword.com'})
				.then(function(user){
					expect(user.email).to.equal('needle@sword.com');
					done()
				})
				.then(null,done);
			});

			afterEach(function(done){

				User.find({$or: [{name: 'Jon Snow'},{name: 'Arya Stark'}]})
				.remove()
				.exec()
				.then(function(){
					done();
				})
			})

		})		
	})

	xdescribe("Methods",function(){
		describe("findSimilar",function(){

			var page1, 
				page2,
				page3;

				beforeEach(function(done){

					page1 = {title: 'Test1',
								 content: 'Here is content', 
								tags: ['fullstack', 'table', 'testTag']
								};
					page2 = {title: 'Test2',
								 content: 'Here is content #2', 
								tags: ['testTag']
								};
					page3 = {title: 'Test3',
								 content: 'Here is content #3', 
								tags: ['randomTag']
								};

					Page.create([page1,page2], done);
			});			
		//Skipped over, must come back//	
			it("Is able to find pages with similar tags",function(done){
				Page.findOne({title: 'Test1'})
				.then(function(page){
					return page.findSimilar();
				})
				.then(function(pagesArray){
					console.log(pagesArray)
					pagesArray[0].tags.should.contain.an.item.that.deep.equals("testTag")
					done();
				})
				.then(null,done);
			});
			it("Never gets itself",function(done){

			});
			it("Only gets pages with similar tags",function(done){

			});
		//Skipped up to here//
			afterEach(function(done){

			Page.find({$or: [{title: 'Test1'},{title: 'Test2'},{title: 'Test3'}]})
			.remove()
			.exec()
			.then(function(){
				done();
			})
		})

		})
	})

	describe("Virtuals",function(){

		describe("route",function(){
			var page1
				beforeEach(function(done){

					
					page1 = {	title: 'The Virtual Title',
								 content: 'Virtual1', 
								tags: ['fullstack', 'table', 'testTag']
								};				
					Page.create([page1], done);
				})


			it("creates a url with /wiki/ + the urlTitle",function(done){
				Page.findOne({title: "The Virtual Title"})
				.then(function(page){

					expect(page.route).to.equal("/wiki/The_Virtual_Title");
					done();
				})
				.then(null,done);
			});
		
			afterEach(function(done){

			Page.find({$or: [{content: "Virtual"},{title: "The Virtual Title"}]})
			.remove()
			.exec()
			.then(function(){
				done();
			})
		})
		})

	})
})

