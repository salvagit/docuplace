var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:1234");

describe("Docutests - test forms",() => {

  it("add testForm",(done) => {

    //calling ADD api
    server
    .post('/forms/testForm')
    .send({name : 'pepito', last : 'terere', age : 20})
    .expect("Content-type",/json/)
    .expect(200)
    .end((err,res) => {
      res.status.should.equal(200);
      //res.body.error.should.equal(false);
      //res.body.data.should.equal(30);
      done();
    });
  });

  it("test get testForm",(done) => {
    server
    .get("/forms/testForm")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
console.log(res.body);
      //res.body.error.should.equal(false);
      done();
    });
  });
});
