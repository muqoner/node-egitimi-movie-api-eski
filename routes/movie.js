var express = require('express');
var router = express.Router();
const Movie = require("../models/Movie_Schema");


router.post('/', function(req, res, next) {
  // const {title, imdb_score, category, country, year} = req.body;
  
  const movie = new Movie(req.body);

  const promise = movie.save();
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })

  // movie.save((err,data)=>{
  //   if(err)
  //     res.json(err);
  //   res.json(data);
  // })

  
});

module.exports = router;
