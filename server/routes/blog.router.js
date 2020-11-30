const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');


// let blogs = ['blogs'];


// router.post('/login',
//   passport.authenticate('github'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//         console.log(req.user.username);
//     res.redirect('/' + req.user.username);
//   });

//  send information fromm the server into the client
router.get('/', (req, res) => {
    // passport.authenticate('github'),
    // function(req, res) {
    //     // If this function gets called, authentication was successful.
    //     // `req.user` contains the authenticated user.
    //     // res.redirect('/users/' + req.user.username);
    //     console.log(req.user.username);
    //   }
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
router.post('/',
// connectEnsureLogin.ensureLoggedIn(),
 (req, res) => {
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

// DELETE Route
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    // set up the sql text with sanitization
    let sqlText = `DELETE FROM blog WHERE id=$1;`;
    // execute the command filling in the value with id
    pool.query(sqlText, [id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error from db:', error);
            res.sendStatus(500);
        })
})



module.exports = router;