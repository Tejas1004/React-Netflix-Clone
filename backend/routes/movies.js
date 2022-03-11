const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken")
require('dotenv').config();

//CREATE MOVIE
router.post("/",verify,async(req,res)=>{
    if(req.user.admin){
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save()
            res.status(201).json(savedMovie);
        } catch (error) {
            res.send(401).json(err);
        }
    }
    else{
        res.status(403).json("you are not allowed");
    }
})


//UPDATE MOVIE
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedMovie);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can't update the movie!");
    }
  });
  
//DELETE USER
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("Netflix Movie Successfully Deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Oops! Movie Data Not Deleted");
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
}); 
//GET ALL SERIES AND MOVIES
router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET MOVIE INOFORMATION
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const movies = await Movie.find();
        res.status(200).json(movies.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });

module.exports = router; 