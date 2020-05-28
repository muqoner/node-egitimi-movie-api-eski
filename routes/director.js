var express = require('express');
var router = express.Router();
const DirectorSchema = require("../models/Director_Schema");


router.post('/', function(req, res, next) {
  const director = new DirectorSchema(req.body);
  const promise = director.save();
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
});

module.exports = router;
