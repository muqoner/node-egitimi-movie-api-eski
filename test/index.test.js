const chai = require("chai");

const chaiHttp = require("chai-http");
const should = chai.should();

const server = require("../app");

chai.use(chaiHttp);

describe("Node Server Test",()=>{
    it("get / anasayfayı döndürür",(done)=>{
        chai.request(server)
        .get("/")
        .end((err,res)=>{
            res.should.have.status(200);
            done();
        })
    })
})

// describe("Node Server Test", ()=>{
//     it("(GET /) anasayfayı döndürür", (done)=>{
//         chai.request(server)
//         .get("/")
//         .end((err,res)=>{
//             res.should.have.status(200);
//             done();
//         })
//     });
    
// })
