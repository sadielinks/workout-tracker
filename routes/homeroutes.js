const router = require('express').Router();
const path = require('path');

// GET routes to follow:

// home route
router.get("/", (req, res) => {
    // route to index.html
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// add exercise route
router.get("/", (req, res) => {
    // route to exercise.html
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

// add workout dashboard route
router.get("/", (req, res) => {
    // route to stats.html
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});