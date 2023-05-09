// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
//const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs")
})

router.post("/create", (req, res, next) => {
    //console.log(req.body)
    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    })
    .then(() => {
        console.log("Se ha creado la celebridad")
        res.redirect("/")
    })
    .catch((error) => {
        next(error)
    })
})

router.get("/", (req, res, next) => {

    Celebrity.find()
    .then((allCelebrities) =>{
        res.render("celebrities/celebrities.hbs", {
            allCelebrities
        })
    })
})


module.exports = router;