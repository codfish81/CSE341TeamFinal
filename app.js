const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./path/swagger-output.json');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const app = express();
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const port = process.env.PORT || 8080;

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Passport
require('./passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
require('./passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '/public')))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes'));

mongodb.connect((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
