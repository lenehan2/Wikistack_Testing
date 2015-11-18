var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

//console.log("Funny");

xdescribe("simple math",function(){
	it("should add up",function(){
		expect(2+2).to.equal(4);
	});
});


xdescribe("A timeout function",function(){
	it("should timeout for a given amount of time",function(done){
		var newDate = new Date();
		setTimeout(function(){
			var date2 = new Date();
			var duration = date2-newDate;
			expect(duration).to.be.closeTo(1000,50);
			done()
		},1000);
	})
});


xdescribe("forEach spy",function(){

	// before(function(){
	
	// });	


	it("is only called 5 times",function(){
		var array = [1,2,3,4,5];
		var funcObj = {
			func: function(a){console.log(a)}
		}
		var spy = chai.spy.on(funcObj,"func");
		array.forEach(funcObj.func);

		expect(spy).to.have.been.called.exactly(5);

	})


})



