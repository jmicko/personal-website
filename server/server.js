const
    express = require('express'),
    app = express(),
    blogRouter = require('./routes/blog.router'),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 5000,
    passport = require('passport'),
    // LocalStrategy = require('passport-local').Strategy,
    session = require("express-session"),
    connectEnsureLogin = require('connect-ensure-login');

// serve static files
app.use(express.static('server/public'));

// Required for our POST requests to work
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => res.sendFile('login.html', { root: __dirname }));

// direct blog route
app.use('/blogs', blogRouter);

// Set up passport strategy (all passport code was copy/pasted from http://www.passportjs.org/docs/)

app.use(session({
    secret: "code bro",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/success', (req, res) => res.send("You have successfully logged in"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});




/*  GITHUB AUTH  */

const GitHubStrategy = require('passport-github').Strategy;

const GITHUB_CLIENT_ID = "Iv1.128c47064b8909a3"
const GITHUB_CLIENT_SECRET = "e32242951efe343fe6cb7672db2b5b46d9b94e7d";

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

app.get('/auth/github',
    passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/error' }),
    function (req, res) {
        res.redirect('/static/blog.html');
    });




// CONNECT ENSURE LOGIN ROUTE

app.post('/login',
  passport.authenticate('github', { successRedirect: '/static/blog.html',
                                   failureRedirect: '/login' }));


// For testing authentication. Can remove later
app.get('/private',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('private.html', { root: __dirname })
);

app.get('/user',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.send({ user: req.user.username })
);

// router.post('/login',
//   passport.authenticate('github'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//         console.log(req.user.username);
//     res.redirect('/' + req.user.username);
//   });


// start the server
app.listen(PORT, () => {
    console.log('listening on port', PORT)
});