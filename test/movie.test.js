const chai = require("chai");

const chaiHttp = require("chai-http");
const should = chai.should();

const server = require("../app");


chai.use(chaiHttp);
let token;
const username = "ilgim";
const password = "12345";
describe("/api/movies Tests",()=>{
    before((done)=>{
        // console.log("ilk ben çalıştım")
        // done();
        chai.request(server)
        .post("/authenticate")
        .send({username: username , password: password})
        .end((err,res)=>{
            token = res.body;
            console.log(token);
            done();

        })
    });
    describe("/get movies",()=>{
        it("moviesleri sıralamalı",(done)=>{
            done();
        })
    })
    });


