var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const UserSchema = require("../models/Users_Schema");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/register', function(req, res, next) {
//   const {username,password} = req.body;
//   const user = new UserSchema({
//     username,
//     password
//   });
//   const promise = user.save();
//   promise.then((data)=>{
//     res.json(data)
//   }).catch((err)=>{
//     res.json(err)
//   });
  
// });
router.post("/register",(req,res)=>{
  const  {username,password} = req.body;
  bcrypt.hash(password, 10).then((hash)=> {
    const user = new UserSchema({
      username,
      password: hash
    });
    const promise = user.save();
    promise.then((data)=>{
      res.json(data)
    }).catch((err)=>{
      res.json(err)
    })
    // Store hash in your password DB.
});
});
  //kullanıcı girişi token oluşturma
  // router.post("/authenticate",(req,res)=>{
  //   const {username,password} = req.body;
  //   UserSchema.findOne({
  //     username
  //   }, (err, user)=>{
  //     if(err)
  //       res.send("arama hatalı");
  //     if(!user)
  //       res.json({
  //         status: false,
  //         message: "kullanıcı bulunamadı"
  //       });
      
  //   });
  // });
  router.post("/authenticate",(req,res)=>{
    const{username,password} = req.body;
    UserSchema.findOne({
      username
    },(err,user)=>{
      if(err)
        res.send("hatalı arama");
      if(!user)
        res.json({
          status: false,
          message: "bu isimde bir kullanıcı bulunamadı"
        })
        else{
          bcrypt.compare(password, user.password).then((result)=>{
            if(!result){
              res.json({
                status: false,
                message:"şifreler uyuşmuyor"
              })}
            else{
                const payload = {
                  username
                };
                const token = jwt.sign(payload, req.app.get("api_secret_key"),{expiresIn: 720});
                res.json({
                  status: true,
                  token
                })
              };
          })
          }
    })
  });





module.exports = router;
