const express = require('express');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./path/swagger-output.json')
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const app = express();
const port = process.env.PORT || 8080

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use('/', require('./routes'));



mongodb.connect((err, mongodb) => { 
    if(err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
})