const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');




//  send information fromm the client into the server
app.post('/blogs', (req, res) => {
    console.log('Got blogs', req.body);
    // do some blog db inserting here
    res.sendStatus(201); // Created
})

//  send information fromm the server into the client
app.get('/blogs', (req, res) => {
    console.log('Getting blogs');
    // do some blog getting here
    res.send(blogs);
})


module.exports = router;