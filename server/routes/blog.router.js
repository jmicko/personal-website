const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

let blogs = ['blogs'];


//  send information fromm the server into the client
router.get('/', (req, res) => {
    console.log('Getting blog posts');
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
    let post = req.body;
    console.log('Inserting blog post', post);
    // do some blog db inserting here
    let queryText = `INSERT INTO "blog" ("title", "content") 
                     VALUES ($1, $2);`;
    pool.query(queryText, [post.title, post.content])
        .then(result => { // once database receives data correctly, we receive the updated status
            res.sendStatus(201);
        }).catch(error => {
            console.log(`Error adding new task`, error);
            res.sendStatus(500);
        });
})


module.exports = router;