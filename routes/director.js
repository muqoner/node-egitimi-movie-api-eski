const mongoose = require("mongoose");
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

//tüm directorları filmleriyle beraber sıralama
router.get("/",(req,res)=>{
  const promise = DirectorSchema.aggregate([
    {
      $lookup: {
        from: "movies",
        localField: "_id",
        foreignField:"director_id",
        as:"movies"
      }
    },
    {
      $unwind: {
        path:"$movies",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group:{
        _id: {
          _id: "$_id",
          name:"$name",
          surname:"$surname",
          bio:"$bio"
        },
        movies: {
          $push: "$movies"
        }
      }
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        surname: "$_id.surname",
        movies: "$movies"
      }
    }
  ])
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
});
//belli bir id ye bağlı filmleri sıralama
router.get("/:director_id",(req,res)=>{
  const promise = DirectorSchema.aggregate([
    {
      $match:{
        "_id": mongoose.Types.ObjectId(req.params.director_id)

        
      }
    },
    {
      $lookup: {
        from: "movies",
        localField: "_id",
        foreignField:"director_id",
        as:"movies"
      }
    },
    {
      $unwind: {
        path:"$movies",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group:{
        _id: {
          _id: "$_id",
          name:"$name",
          surname:"$surname",
          bio:"$bio"
        },
        movies: {
          $push: "$movies"
        }
      }
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        surname: "$_id.surname",
        movies: "$movies"
      }
    }
  ])
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
});

// director update
router.put("/:director_id",(req,res,next)=>{
  const promise = DirectorSchema.findByIdAndUpdate(req.params.director_id,req.body,{new:true});
  promise.then((data)=>{
    if(!data){
      next({message:"bu id de director bulunamadı", code: 99})
    }
    res.json(data)
  }).catch((err)=>{
    res.json(err.message);
  })
});

//delete
router.delete("/:director_id",(req,res)=>{
  const promise = DirectorSchema.findByIdAndRemove(req.params.director_id);
  promise.then((messege)=>res.json("veri başarıyla silindi"))
  .catch((err)=>{
    res.json("bu id bulunamadı");
  })
})

module.exports = router;
