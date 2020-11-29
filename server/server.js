const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const blogRouter = require('./routes/blog.router');

// serve static files
app.use(express.static('server/public'));

// Required for our POST requests to work
app.use(bodyParser.urlencoded({extended: true}));

// direct blog route
app.use('/blogs', blogRouter);


app.listen(PORT, () => {
    console.log('listening on port', PORT)
});