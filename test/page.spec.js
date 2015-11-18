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
				page = new Page()
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
					expect(err).to.be.a('null');
					done();	
				});			
			});
		});	

		describe("user",function(){

			var user = new User();
			beforeEach(function(){});

			it("Throws an error without name",function(){});
			it("Throws an error without email",function(){});
			it("Creates a new user model with proper input",function(){});
		});
	});

	describe("Hooks",function(){

		it("Creates a random title when title is not give",function(){})

		it("It replaces the title with a url safe title",function(){})


	});

	describe("Statics",function(){

		describe("FindbyTag",function(){

			it("Is able to find pages by their tag",function(){})
			it("Only gets pages with the tag",function(){});

		});

		describe("FindOrCreate",function(){

			it("FindOrCreate is able to find a user",function(){})
			
			it("It is able to create user if none is found",function(){})

		})		
	})

	describe("Methods",function(){
		describe("findSimilar",function(){
			it("Is able to find pages with similar tags",function(){});
			it("Never gets itself",function(){});
			it("Only gets pages with similar tags",function(){});
		})
	})

	describe("Virtuals",function(){

		describe("route",function(){

			it("creates a url with /wiki/ + the urlTitle",function(){

			})
		})

	})
})

