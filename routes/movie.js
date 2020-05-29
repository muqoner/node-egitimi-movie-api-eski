var express = require('express');
var router = express.Router();
const Movie = require("../models/Movie_Schema");

// api/movies anasayfaya get atma
router.get("/",(req,res)=>{
  const promise = Movie.aggregate([{
    $lookup:{
      from:"directors",
      localField: "director_id",
      foreignField:"_id",
      as:"director"
    }},
    {
      $unwind:"$director"
    }
  
  ]);
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err);
  })
});
//top10 listeleme
router.get("/top10",(req,res)=>{
  const response = Movie.find({ }).limit(10).sort({"imdb_score" : -1});
  response.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
});

//Between 
router.get("/between/:start_year/:end_year",(req,res)=>{
  const {start_year, end_year} = req.params;
  const promise = Movie.find({year:{"$gte":parseInt(start_year), 
    "$lte":parseInt(end_year)}});
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})

// Id bazlı sorgu yapma

router.get("/:movie_id",(req,res,next)=>{
  const promise = Movie.findById(req.params.movie_id);
  promise.then((movie)=>{
    if(!movie)
      next({message: "aradığınız id ile eşleşen film bulunamadı", code: 99});
    
    res.json(movie)
  }).catch((err)=>{
    res.json(err.message);
  })
});

//id ile put işlemi
router.put("/:movie_id",(req,res)=>{
  const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new: true}); // new:true---> donecek data artık eskisi değil değişikliğe uğramış guncel data
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});

// delete endpoint

router.delete("/:movie_id",(req,res)=>{
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then(res.json("veri başarıyla silindi"))
  .catch((err)=>{
    res.json(err);
  })
})


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
