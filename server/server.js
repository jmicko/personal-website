const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const songRouter = require('./routes/blog.router');

// Required for our POST requests to work
app.use(bodyParser.urlencoded({extended: true}));

// direct blog route
app.use('/blog', blogRouter);

// serve static files
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});