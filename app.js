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

// Session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Add the middleware function to log incoming requests
app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    next();
  });

// Passport
require('./passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

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
