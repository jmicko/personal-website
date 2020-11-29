const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

let blogs = ['blogs'];


//  send information fromm the server into the client
router.get('/', (req, res) => {
    console.log('Getting blogs');
    // do some blog getting here
    let queryText = 'SELECT * FROM blog ORDER BY published DESC;';
    pool.query(queryText)
        .then(result => {
            // send back the results in an object
            res.send(result.rows);
        }).catch(error => {
            console.log('error getting blogs', error);
            res.sendStatus(500);
        });
})

//  send information fromm the client into the server
router.post('/', (req, res) => {
    console.log('Got blogs', req.body);
    // do some blog db inserting here
    res.sendStatus(201); // Created
})


module.exports = router;