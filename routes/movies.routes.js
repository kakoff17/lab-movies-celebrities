// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const mongoose = require("mongoose")

const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

// all your routes here

router.get("/create", (req, res, next) => {
    Celebrity.find()
    .then((allCelebrities) => {
        res.render("movies/new-movie.hbs", {
            allCelebrities
        })
    })
    .catch((error) => {
        console.log(error)
    })
    
})

router.post("/create", (req, res, next) => {
    //console.log(req.body)
    Movie.create({
        title: req.body.title,
        genre: req.body.genre,
        plot : req.body.genre,
        cast: req.body.cast,
    })
    .then(() => {
        res.redirect("/movies")
    })
    .catch((error) => {
        next(error)
    })
})

router.get("/", (req, res, next) => {
    Movie.find()
    .then((allMovies) =>{
        console.log(allMovies)
        res.render("movies/movies.hbs", {
            allMovies
        })
    })
    .catch((error) => {
        next(error)
    })
})

router.get("/:moviesId", (req, res, next) => {
     Movie.findById(req.params.moviesId)
    .populate("cast")
    .then((movieDetails) => {   
        //console.log(movieDetails)     
        res.render("movies/movie-details.hbs", {
            movieDetails
        }) 
    })
    .catch((error) => {
        next(error)
    })
})

router.post("/:moviesId/delete", (req, res, next) => {

    Movie.findByIdAndDelete(req.params.moviesId)
    .then(() => {
        res.redirect("/movies")
    })
    .catch((error) => {
        next(error)
    })
})



module.exports = router;